import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function Header() {
    return (
        <>
            <ToastContainer/>
            <header className='container-fluid bg-black'>
                <div className='container'>
                    <div className='row'>
                        <Navbar collapseOnSelect expand="lg">
                            <Container>
                                <Navbar.Brand>
                                    <Link to="/">
                                        <img src='https://www.wscubetech.com/images/ws-cube-white-logo.svg'/>
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Link to="product-listings" className='text-white p-3'>Product Listings</Link>
                                            <Link to="about-us" className='text-white p-3  text-decoration-none'>About Us</Link>
                                        
                                        <NavDropdown title="Dropdowns" id="collapsible-nav-dropdown" className='text-white'>
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                                Separated link
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link href="#deets" className='text-white'>More deets</Nav.Link>
                                        <Nav.Link eventKey={2} href="#memes" className='text-white'>
                                            Dank memes
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </header>
        </>
    )
}
