import React from 'react'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

export default function ProductPlaceHolder({type}) {
    return (
        <>
            <div className={type == 1 ? 'col-md-3' : 'col-md-4'}>
                <Card>
                    <Card.Img variant="top" src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
