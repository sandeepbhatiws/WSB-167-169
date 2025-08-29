import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Product from './Product';

export default function BestSelling({ productData }) {

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
                            productData.map((v,i) => {
                                return (
                                    <Product type="2" key={i} data={v}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
