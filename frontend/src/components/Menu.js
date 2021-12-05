import React from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

const Menu = () => {
    return(
        <div className='bg-dark'>
            <Container>
                <Row>
                    <Col className='col-lg-12 col-sm-12 '>
                        <Navbar>
                            <Navbar.Brand className='text-light'>ToDo List</Navbar.Brand>
                            <Nav>
                                <li > <Link style={{marginRight: '10px'}} className="text-light" to='/users'>
                                    Пользователи</Link></li>
                                <li ><Link style={{marginRight: '10px'}} className="text-light" to='/projects'>Проекты</Link></li>
                                <li ><Link style={{marginRight: '10px'}} className="text-light" to='/todo'>Задачи</Link></li>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Menu;
