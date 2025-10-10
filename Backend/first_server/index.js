const express = require('express');
const { properties, productDetails } = require('./data');
const server = express();  // To make it Exucutable Function
const validation = require('./midelware.js');

const route = express.Router();
route.use(validation);

server.get('/', (request, response) => {
    response.send('Server is working !!');
});

server.get('/api/properties', validation , (request,response) => {

    if(properties.length > 0){
        const data = {
            _status : true,
            _message : 'Record found !!',
            _data : properties
        }

        response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No record found !!',
            _data : []
        }

        response.send(data);
    }

});

route.get('/api/product-details', (request,response) => {

    if(productDetails != ''){
        const data = {
            _status : true,
            _message : 'Record found !!',
            _data : productDetails
        }

        response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No record found !!',
            _data : null
        }

        response.send(data);
    }

});

server.use('/', route);

server.listen(5000, () => {
    console.log('Server is working fine !!')
});