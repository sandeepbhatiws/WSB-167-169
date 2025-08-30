import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Product({type, data}) {
    return (
        <>
            <div className={ type == 1 ? 'col-md-3' : 'col-md-4' }>
                <Card>
                    <Card.Img variant="top" src={data.image} />
                    <Card.Body>
                        <Card.Title>{ data.name }</Card.Title>
                        <Card.Text>
                            Rs. {data.price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
