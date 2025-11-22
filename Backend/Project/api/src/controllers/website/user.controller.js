const userModal = require("../../models/user");
const env = require('dotenv').config();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async(request, response) => {

    try {
        var dataSave = request.body;
        dataSave.role_type = 'users';
        dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

        new userModal(dataSave).save()
        .then((result) => {
            var token = jwt.sign({ userInfo : result }, process.env.secret_key);

            const data = {
                _status : true,
                _message : 'Register succussfully !',
                _token : token,
                _data : result
            }

            response.send(data);
        })
        .catch((error) => {
            console.log(error);
            var errors = {};
            for (var i in error.errors) {
                errors[i] = error.errors[i].message;
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errors,
                _data: null
            }

            response.send(data);
        })
    } catch (error) {
        console.log(error);
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }

        response.send(data);
    }
}

exports.login = async(request, response) => {

    const checkEmail = await userModal.findOne({ email : request.body.email });

    if(!checkEmail){
        const data = {
            _status : false,
            _message : 'Invalid Email Address !',
            _data : ''
        }

        response.send(data);
    }

    const checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);

    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !',
            _data : ''
        }

        response.send(data);
    }

    if(checkEmail.status == false){
        const data = {
            _status : false,
            _message : 'Acoount is inactive. Please contact admin !',
            _data : ''
        }

        response.send(data);
    }

    var token = jwt.sign({ userInfo : checkEmail }, process.env.secret_key);

    const data = {
        _status : true,
        _message : 'Login succussfully !',
        _token : token,
        _data : checkEmail
    }

    response.send(data);
}

exports.viewProfile = async(request, response) => {
    try {
        var decoded = jwt.verify(request.body.token, process.env.secret_key);

        if(!decoded){
            const data = {
                _status : false,
                _message : 'Invalid token value !',
                _data : ''
            }

            response.send(data);
        }

        console.log(decoded.userInfo);

        await userModal.findById(decoded.userInfo._id)
        .then((result) => {
            if(result){
                const data = {
                    _status: true,
                    _message: 'Record found succussfully !!',
                    _image_path : process.env.default_image,
                    _data: result
                }
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found !!',
                    _data: result
                }
                response.send(data);
            }
            
        })
        .catch((error) => {
            console.log(error)
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: error,
                _data: null
            }
            response.send(data);
        });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.updateProfile = (request, response) => {

}

exports.changePassword = (request, response) => {

}

exports.forgotPassword = (request, response) => {

}

exports.resetPassword = (request, response) => {

}







exports.create = (request, response) => {

    var data = request.body;

    if(request.file){
        data.image = request.file.filename;
    }

    try {

        var saveData = new defaultModal(data).save()
            .then((result) => {
                const data = {
                    _status: true,
                    _message: 'Record created succussfully !!',
                    _data: result
                }
                response.send(data);
            })
            .catch((error) => {

                var errors = {};
                for (var i in error.errors) {
                    errors[i] = error.errors[i].message;
                }

                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: errors,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.view = async (request, response) => {

    var current_page = 1;
    var total_records = 0;
    var total_pages = 0;
    var limit = 10;
    var skip = 0;

    if(request.body){
        if(request.body.limit != '' && request.body.limit != undefined){
            limit = parseInt(request.body.limit);
        }

        if(request.body.page != '' && request.body.page != undefined){
            skip = (request.body.page - 1) * limit;
            current_page = parseInt(request.body.page);
        }
    }

    try {

        const addCondition = [
            {
                deleted_at : null, 
                name: { $exists: true }
            }
        ];

        const orCondition = [];

        if(request.body){
            if(request.body.name != undefined){
                if(request.body.name != ''){
                    var name = new RegExp(request.body.name,"i");
                    addCondition.push({ name : name })
                }
            }
        }

        if(addCondition.length > 0){
            var filter = { $and : addCondition }
        } else {
            var filter = {}
        }

        if(orCondition.length > 0){
            filter.$or = orCondition;
        }

        total_records = await defaultModal.find(filter).countDocuments();

        await defaultModal.find(filter).select('name image status order').skip(skip).limit(limit).sort({ _id : 'desc'})
            .then((result) => {
                if(result.length > 0){

                    var paginate = {
                        current_page : current_page,
                        total_pages : Math.ceil(total_records/limit),
                        total_records : total_records
                    }

                    const data = {
                        _status: true,
                        _message: 'Record found succussfully !!',
                        _paginate : paginate,
                        _image_path : process.env.default_image,
                        _data: result
                    }
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No Record found !!',
                        _data: result
                    }
                    response.send(data);
                }
                
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: error,
                    _data: []
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: []
        }
        response.send(data);
    }
}

exports.update = async(request, response) => {
    try {

        var data = request.body;
        data.updated_at = Date.now();

        if(request.file){
            data.image = request.file.filename;
        }

        var saveData = await defaultModal.updateOne({
            _id : request.params.id
        },{
            $set : data
        })
            .then((result) => {
                if(result.matchedCount == 1){
                    const data = {
                        _status: true,
                        _message: 'Record updated succussfully !!',
                        _data: result
                    }
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'Record does not exit !!',
                        _data: result
                    }
                    response.send(data);
                }
                
            })
            .catch((error) => {

                var errors = [];

                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }

                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: errors,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.destroy = async (request, response) => {
    try {

        var data = {
            deleted_at : Date.now()
        }

        var saveData = await defaultModal.updateMany({
            _id : request.body.ids
        },{
            $set : data
        })
            .then((result) => {
                if(result.matchedCount == 1){
                    const data = {
                        _status: true,
                        _message: 'Record deleted succussfully !!',
                        _data: result
                    }
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'Record does not exit !!',
                        _data: result
                    }
                    response.send(data);
                }
                
            })
            .catch((error) => {

                var errors = [];

                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }

                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: errors,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}

exports.changeStatus = async(request, response) => {
    try {
        var saveData = await defaultModal.updateMany({
            _id : request.body.ids
        },[{
            $set : {
                status : {
                    $not : "$status"
                }
            }
        }])
            .then((result) => {
                if(result.matchedCount > 0){
                    const data = {
                        _status: true,
                        _message: 'Change status succussfully !!',
                        _data: result
                    }
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'Record does not exit !!',
                        _data: result
                    }
                    response.send(data);
                }
                
            })
            .catch((error) => {

                var errors = [];

                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }

                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: errors,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}