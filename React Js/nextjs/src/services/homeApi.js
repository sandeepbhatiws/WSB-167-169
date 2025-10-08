import axios from "axios";

let productAPI=()=>{
    return axios.get('https://wscubetech.co/ecommerce-api/products.php',{
        params : {
            limit : 4,
            categories : 'mens-shirts,mens-shoes',
        }
    })
    .then((result) => {
         return result.data.data;
    })
}

let menProductAPI=()=>{
    return axios.get(`${ process.env.NEXT_PUBLIC_BASE_URL }products.php`,{
        params : {
            limit : 4,
            categories : 'mens-shirts,mens-shoes',
        }
    })
    .then((result) => {
         return result.data.data;
    })
}

let womenProductAPI=()=>{
    return axios.get(`${ process.env.NEXT_PUBLIC_BASE_URL }products.php`,{
        params : {
            limit : 4,
            categories : 'tops',
        }
    })
    .then((result) => {
         return result.data.data;
    })
}

export  {productAPI, menProductAPI, womenProductAPI}