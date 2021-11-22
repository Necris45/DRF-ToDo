import React from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Menu = () => {
    return(
        <div className='bg-dark'>
            <Container>
                <Row>
                    <Col className='col-lg-12 col-sm-12 '>

                        <Navbar>
                            <Navbar.Brand className='text-light'>ToDo List</Navbar.Brand>

                            <Nav>
                                <Nav.Link href='#' className="text-light">Пользователи</Nav.Link>
                                <Nav.Link href='#' className="text-light">Проекты</Nav.Link>
                                <Nav.Link href='#' className="text-light">Задачи</Nav.Link>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Menu;
