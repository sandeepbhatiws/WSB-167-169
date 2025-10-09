const http = require('http');

const properties = [
      {
        "id": 47,
        "name": "Ashapurna Girls Hostel Mumbai"
      },
      {
        "id": 43,
        "name": "Buddha Institutions"
      },
      {
        "id": 33,
        "name": "Ashapurna Crown Plaza"
      },
      {
        "id": 52,
        "name": "Ashapurna NRI Vistara"
      },
      {
        "id": 51,
        "name": "Ashapurna Agri Park"
      },
      {
        "id": 34,
        "name": "Ashapurna Mall"
      },
      {
        "id": 48,
        "name": "Ashapurna Mohan Bagh"
      },
      {
        "id": 42,
        "name": "Ashapurna Palace"
      },
      {
        "id": 35,
        "name": "Ashapurna Corporate Office"
      },
      {
        "id": 49,
        "name": "Ashapurna NRI Phase 2"
      },
      {
        "id": 38,
        "name": "Ashapurna NRI"
      },
      {
        "id": 7,
        "name": "Ashapurna Heritage"
      },
      {
        "id": 50,
        "name": "Ashapurna Valley Orchard"
      },
      {
        "id": 45,
        "name": "Ashapurna Kundan Villa"
      },
      {
        "id": 37,
        "name": "Ashapurna Pachpadra"
      },
      {
        "id": 8,
        "name": "Ashapurna Platinum"
      },
      {
        "id": 29,
        "name": "Ashapurna Anmol I,II,III"
      },
      {
        "id": 6,
        "name": "Ashapurna Tower"
      },
      {
        "id": 30,
        "name": "Ashapurna City"
      },
      {
        "id": 14,
        "name": "Ashapurna Aangan Prime"
      },
      {
        "id": 19,
        "name": "Chandan Vihar"
      },
      {
        "id": 23,
        "name": "Ashapurna Valley"
      },
      {
        "id": 26,
        "name": "Ashapurna Golden Valley"
      },
      {
        "id": 28,
        "name": "Ashapurna Nagar"
      },
      {
        "id": 36,
        "name": "Ashapurna Pali"
      },
      {
        "id": 32,
        "name": "Ashapurna Aangan"
      },
      {
        "id": 22,
        "name": "Ashapurna Sanchore"
      },
      {
        "id": 20,
        "name": "Ashapurna Jalore"
      },
      {
        "id": 18,
        "name": "Ashapurna Township Uchiyarda"
      },
      {
        "id": 16,
        "name": "Ashapurna Basera"
      },
      {
        "id": 10,
        "name": "Ashapurna Paradise"
      },
      {
        "id": 21,
        "name": "Ashapurna Nanomax II"
      },
      {
        "id": 9,
        "name": "Ashapurna Enclave"
      },
      {
        "id": 15,
        "name": "Ashapurna Empire"
      },
      {
        "id": 31,
        "name": "Ashapurna Sheoganj"
      }
    ];

// http.createServer((request, response) => {

//     response.end('<h1>Server is working !!</h1>');

// }).listen(8000, () => {
//     console.log('Server is working fine !');
// })

const server = http.createServer((request, response) => {

    console.log(request.url);
    console.log(request.method);

    if(request.url == '/'){
        response.end('<h1>Server is working !!</h1>');
    } else if(request.url == '/about-us'){ 

        if(properties.length > 0){
            const result = {
                _status : true,
                _message : 'Record found succussfully !',
                _data : properties
            }

            response.end(JSON.stringify(result));
        } else {
            const result = {
                _status : false,
                _message : 'No record found !',
                _data : []
            }

            response.end(JSON.stringify(result));
        }

        

    } else if(request.url == '/contact-us' && request.method == 'POST'){
        response.end('<h1>Contact Us !!</h1>');
    } else {
        response.end('<h1>Page Not Found !!</h1>');
    }

})

server.listen(8000, () => {
    console.log('Server is working fine !');
})