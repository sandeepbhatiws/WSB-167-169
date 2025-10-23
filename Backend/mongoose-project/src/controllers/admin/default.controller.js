
exports.create = (request, response) => {
    try {
        
        test.then((result) => {
            const data = {
                _status : true,
                _message : 'Record created succussfully !!',
                _data : result
            }
            response.send(data);
        })
        .catch(() => {
            const data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : null
            }
            response.send(data);
        });
        
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
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

exports.delete = (request, response) => {

}

exports.changeStatus = (request, response) => {

}