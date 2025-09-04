import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';

export default function Product({type, data}) {
    return (
        <>
            <div className={ type == 1 ? 'col-md-3' : 'col-md-4' }>
                <Link to={`/product-listings/details/${ data.id }`} className='text-decoration-none'>
                    <Card>
                        <Card.Img variant="top" src={data.image} />
                        <Card.Body>
                            <Card.Title>{ data.name }</Card.Title>
                            <Card.Text>
                                Rs. {data.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </>
    )
}
