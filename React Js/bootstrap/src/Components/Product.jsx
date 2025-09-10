import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Context } from './ContextAPI';

export default function Product({ type, data }) {

    const {addtoCart} = useContext(Context);

    return (
        <>
            <div className={type == 1 ? 'col-md-3' : 'col-md-4'}>

                <Card>
                    <Link to={`/product-listings/details/${data.id}`} className='text-decoration-none'>
                        <Card.Img variant="top" src={data.image} />
                    </Link>
                    <Card.Body>
                        <Link to={`/product-listings/details/${data.id}`} className='text-decoration-none text-black'>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                                Rs. {data.price}
                            </Card.Text>
                        </Link>
                        <Button variant="primary mt-3" onClick={() => addtoCart(data)}>Add to Cart</Button>
                    </Card.Body>
                </Card>

            </div>
        </>
    )
}
