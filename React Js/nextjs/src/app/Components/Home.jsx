"use client";
import React, { useEffect, useState } from 'react'
import HomeProducts from './HomeProducts'
import axios from 'axios';
import { toast } from 'react-toastify';

export async function getServerSideProps() {
  try {
    const res = await axios.get("https://wscubetech.co/ecommerce-api/products.php", {
      params: {
        limit: 4,
        categories: "mens-shirts,mens-shoes",
      },
    });

    const products = res.data.data;

    console.log(res.data.data);

    return {
      props: { products }, // pass to component
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    // You can return empty array or handle error page
    return {
      props: { products: [] },
    };
  }
}

export default function Home() {

    // console.log(getServerSideProps());

  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php',{
        params : {
            limit : 4,
            categories : 'mens-shirts,mens-shoes',
        }
    })
    .then((result) => {
        setMenProducts(result.data.data);
    })
    .catch(() => {
        toast.error('Something went wrong');
    })

    axios.get('https://wscubetech.co/ecommerce-api/products.php',{
        params : {
            limit : 4,
            categories : 'tops',
        }
    })
    .then((result) => {
        setWomenProducts(result.data.data);
    })
    .catch(() => {
        toast.error('Something went wrong');
    })
  },[]);

  return (
    <>
      <HomeProducts title='Celebration wear for Men' description="Welcome to Bagtesh Fashion Buy Indian Men's Ethnic suits, Tuxedos, Sherwanis, Nehru jacket, Jodhpurs pants, Blazers, Shirts and much more." products = {menProducts}/>
      <HomeProducts title='Celebration wear for Women' description="Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions." products={womenProducts}/>
    </>
  )
}
