import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Product({type}) {
    return (
        <>
            <div className={ type == 1 ? 'col-md-3' : 'col-md-4' }>
                <Card>
                    <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/mobile-phone-wallpaper-soft-focus-delicate-flower-amidst-blurred-orange-meadow-sunset-354016436.jpg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Rs. 500
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
