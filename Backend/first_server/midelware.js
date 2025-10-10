module.exports = (request, response, next) => {

    if(request.query.username == '' || request.query.password == ''){
        const data = {
            _status : false,
            _message : 'Required field missing !!',
            _data : []
        }

        response.send(data);
    } else if( request.query.username != 'user' || request.query.password != 'password' ){
        const data = {
            _status : false,
            _message : 'username or password is incorrect !!',
            _data : []
        }

        response.send(data);
    } 

    next();
}