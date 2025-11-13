const productModal = require("../../models/product");
const subSubCategoryModal = require("../../models/subSubCategory");
const env = require('dotenv').config();
var slugify = require('slugify')

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.viewSubSubCategory = async (request, response) => {
    try {

        const addCondition = [
            {
                deleted_at : null,
            }
        ];

        const orCondition = [{
            status : true,
        }];

        if(request.body){
            if(request.body.id != undefined){
                if(request.body.id != ''){
                    orCondition.push({ _id : request.body.id })
                }
            }

            if(request.body.parent_category != undefined){
                if(request.body.parent_category != ''){
                    addCondition.push({ parent_category : request.body.parent_category })
                }
            }

            if(request.body.sub_category != undefined){
                if(request.body.sub_category != ''){
                    addCondition.push({ sub_category : request.body.sub_category })
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

        await subSubCategoryModal.find(filter).select('_id name parent_category')
        .sort({ _id : 'desc'})
        .then((result) => {
            if(result.length > 0){
                const data = {
                    _status: true,
                    _message: 'Record found succussfully !!',
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

exports.create = async(request, response) => {

    var data = request.body;

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
        });
        data.slug = await generateUniqueSlug(productModal, slug);
    }

    // if(request.file){
    //     data.image = request.file.filename;
    // }

    try {

        var saveData = new productModal(data).save()
            .then(async(result) => {
                const data = {
                    _status: true,
                    _message: 'Record created succussfully !!',
                    _data: result
                }
                response.send(data);
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

            if(request.body.parent_category_id != undefined){
                if(request.body.parent_category_id != ''){
                    addCondition.push({ parent_category : request.body.parent_category_id })
                }
            }

            if(request.body.sub_category_id != undefined){
                if(request.body.sub_category_id != ''){
                    addCondition.push({ sub_category : request.body.sub_category_id })
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

        total_records = await productModal.find(filter).countDocuments();

        await productModal.find(filter)
        // .select('name parent_category image status order')
        .populate('parent_category', 'name')
        .populate('sub_category', 'name')
        .skip(skip).limit(limit).sort({ _id : 'desc'})
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
                        _image_path : process.env.product_image,
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

exports.details = async (request, response) => {
    try {

        await productModal.findById(request.params.id)
            .then((result) => {
                if(result){
                    const data = {
                        _status: true,
                        _message: 'Record found succussfully !!',
                        _image_path : process.env.product_image,
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

exports.update = async(request, response) => {
    try {
        var data = request.body;

        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
        });

        data.slug = await generateUniqueSlug(productModal, slug);

        data.updated_at = Date.now();

        // if(request.file != undefined){
        //     if(request.file){
        //         data.image = request.file.filename;
        //     }
        // }

        var saveData = await productModal.updateOne({
            _id : request.params.id
        },{
            $set : data
        })
            .then(async(result) => {
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

        var saveData = await productModal.updateMany({
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
        var saveData = await productModal.updateMany({
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