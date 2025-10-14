const express = require('express');
const dbConnection = require('./dbConfig.js');

const server = express(); // To make executable function


server.get('/', (request, response) => {
    response.send('Server start !!');
})

server.get('/api/category/add',async (request,response) => {

    const data = {
        name : request.query.name,
        image : request.query.image
    }

    const db = await dbConnection();
    db.collection('categories').insertOne(data)
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record created succussfully !!',
            _data : result
        }

        response.send(output);
    })
    .catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong !',
            _data : null
        }

        response.send(output);
    })

});

server.get('/api/category/view',async (request,response) => {

    const db = await dbConnection();
    db.collection('categories').find().toArray()
    .then((result) => {
        if(result.length > 0){
            const output = {
                _status : true,
                _message : 'Record found succussfully !!',
                _data : result
            }

            response.send(output);
        } else {
            const output = {
                _status : false,
                _message : 'No record found !!',
                _data : []
            }

            response.send(output);
        }
        
    })
    .catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong !',
            _data : []
        }

        response.send(output);
    })

});

server.get('/api/category/details/:name', async (request,response) => {

    const db = await dbConnection();
    db.collection('categories').findOne({
        name : request.params.name
    })
    .then((result) => {
        console.log(result);
        if(result){
            const output = {
                _status : true,
                _message : 'Record found succussfully !!',
                _data : result
            }

            response.send(output);
        } else {
            const output = {
                _status : false,
                _message : 'No record found !!',
                _data : null
            }

            response.send(output);
        }
        
    })
    .catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong !',
            _data : null
        }

        response.send(output);
    })

});



server.listen(5000, () => {
    console.log('Server is working fine !!');
})