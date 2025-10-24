const defaultModal = require("../../models/default");

exports.create = (request, response) => {
    try {

        var saveData = new defaultModal(request.body).save()
        .then((result) => {
            const data = {
                _status : true,
                _message : 'Record created succussfully !!',
                _data : result
            }
            response.send(data);
        })
        .catch((error) => {
            const data = {
                _status : false,
                _message : 'Something went wrong !!',
                _error : error,
                _data : null
            }
            response.send(data);
        });
        
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : error,
            _data : null
        }
        response.send(data);
    }
}

exports.view = (request, response) => {

}

exports.details = (request, response) => {

}

exports.update = (request, response) => {

}

exports.destroy = (request, response) => {

}

exports.changeStatus = (request, response) => {

}