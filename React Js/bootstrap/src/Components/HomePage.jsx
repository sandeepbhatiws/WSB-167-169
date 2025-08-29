import React, { useEffect, useState } from 'react'
import Header from './Header'
import BestSelling from './BestSelling'
import TrendingProducts from './TrendingProducts'
import axios from 'axios'

export default function HomePage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=12')
            .then((result) => {
                setProducts(result.data.products);
            })
            .catch(() => {

            })
    }, []);

    return (
        <>
            <Header />
            <BestSelling productData={products} />
            <TrendingProducts productData={products} />
        </>
    )
}
