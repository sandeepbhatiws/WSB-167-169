import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Product from './Product';

export default function BestSelling() {

    const [getProducts, setGetProdoucts] = useState([1, 2, 3, 4, 5, 6]);

    return (
        <>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row text-center p-5'>
                        <div className='col-12'>
                            <h1>Best Selling Products</h1>
                        </div>
                    </div>
                    <div className='row row-gap-3'>
                        {
                            getProducts.map(() => {
                                return (
                                    <Product type="2"/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
