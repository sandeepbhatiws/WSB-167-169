const express = require('express');
const dbConnection = require('./dbConfig.js');
const mongoDB = require('mongodb');

const server = express(); // To make executable function

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

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

// server.get('/api/category/update/:id',async (request,response) => {

//     try {
//         const data = {
//             name : request.query.name,
//             image : request.query.image
//         }

//         var id = new mongoDB.ObjectId(request.params.id);

//         const db = await dbConnection();
//         db.collection('categories').updateOne(
//             { 
//                 _id : id
//             }, 
//             {
//                 $set : data
//             })
//         .then((result) => {
//             const output = {
//                 _status : true,
//                 _message : 'Record updated succussfully !!',
//                 _data : result
//             }

//             response.send(output);
//         })
//         .catch(() => {
//             const output = {
//                 _status : false,
//                 _message : 'Something went wrong !',
//                 _data : null
//             }

//             response.send(output);
//         })
//     } catch (error) {
//         const output = {
//             _status : false,
//             _message : 'Something went wrong !',
//             _data : null
//         }

//         response.send(output);
//     }

    

// });


server.get('/api/category/update/:id',async (request,response) => {

    var status = 0;
    var apiResponse = '';

    try {
        const data = {
            name : request.query.name,
            image : request.query.image
        }

        var id = new mongoDB.ObjectId(request.params.id);

        const db = await dbConnection();
        var result = await db.collection('categories').updateOne(
        { 
            _id : id
        }, 
        {
            $set : data
        });

        status = 1;
    } catch (error) {
        status = 0;
    }

    // console.log(result)
    // console.log(status)

    if(status == 0){
        const output = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(output);
    }
    if(result.matchedCount > 0 && status == 1){
        const output = {
            _status : true,
            _message : 'Record updated succussfully !!',
            _data : result
        }

        response.send(output);
    } else if(result.matchedCount == 0 && status == 1){
        const output = {
            _status : false,
            _message : 'No record Found !!',
            _data : null
        }

        response.send(output);
    }
    

});


server.get('/api/category/delete/:id', async (request,response) => {

    const db = await dbConnection();
    db.collection('categories').deleteOne({
        _id : new mongoDB.ObjectId(request.params.id)
    })
    .then((result) => {
        if(result.deletedCount != 0){
            const output = {
                _status : true,
                _message : 'Record delete succussfully !!',
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

server.post('/api/brands/add',async (request,response) => {

    const data = {
        name : request.body.name,
    }

    const db = await dbConnection();
    db.collection('brands').insertOne(data)
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

server.post('/api/brands/view',async (request,response) => {

    const db = await dbConnection();
    db.collection('brands').find().toArray()
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

server.put('/api/brands/update/:id',async (request,response) => {

    var status = 0;
    var apiResponse = '';

    try {
        const data = {
            name : request.body.name,
        }

        var id = new mongoDB.ObjectId(request.params.id);

        const db = await dbConnection();
        var result = await db.collection('brands').updateOne(
        { 
            _id : id
        }, 
        {
            $set : data
        });

        status = 1;
    } catch (error) {
        status = 0;
    }

    if(status == 0){
        const output = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(output);
    }
    if(result.matchedCount > 0 && status == 1){
        const output = {
            _status : true,
            _message : 'Record updated succussfully !!',
            _data : result
        }

        response.send(output);
    } else if(result.matchedCount == 0 && status == 1){
        const output = {
            _status : false,
            _message : 'No record Found !!',
            _data : null
        }

        response.send(output);
    }
    

});

server.delete('/api/brands/delete/:id', async (request,response) => {

    const db = await dbConnection();
    db.collection('brands').deleteOne({
        _id : new mongoDB.ObjectId(request.params.id)
    })
    .then((result) => {
        if(result.deletedCount != 0){
            const output = {
                _status : true,
                _message : 'Record delete succussfully !!',
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