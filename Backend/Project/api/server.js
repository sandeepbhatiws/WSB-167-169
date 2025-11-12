const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();
const mongoose = require('mongoose');

const server = express(); // Executable Function

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

server.get('/', (request, response) => {
    response.send('Server is working fine !!');
});

server.use('/uploads/default', express.static('uploads/default'));
server.use('/uploads/categories', express.static('uploads/categories'));

// Admin API URls
require('./src/routes/admin/default.routes.js')(server);
require('./src/routes/admin/color.routes.js')(server);
require('./src/routes/admin/material.routes.js')(server);
require('./src/routes/admin/category.routes.js')(server);
require('./src/routes/admin/subCategory.routes.js')(server);
require('./src/routes/admin/subSubCategory.routes.js')(server);



mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@sandeep.ktfb1.mongodb.net/${process.env.db_name}?appName=sandeep`)
.then(() => console.log('Connected!'))
.catch((error) => {
    console.log(error);
});

server.listen(process.env.PORT, () => {
    console.log('Server is working fine !!');
})