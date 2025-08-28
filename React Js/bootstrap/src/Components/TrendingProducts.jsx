import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Product from './Product';

export default function TrendingProducts() {

    const [getProducts, setGetProdoucts] = useState([1,2,3,4,5,6,7,8]);

    return (
        <>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row text-center p-5'>
                        <div className='col-12'>
                            <h1>Trending Products</h1>
                        </div>
                    </div>
                    <div className='row row-gap-3'>
                        {
                            getProducts.map(() => {
                                return(
                                    <Product type="1"/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
