import React from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

const Menu = ({is_authenticated, logout, login}) => {
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
                                {is_authenticated() ?
                                    <h6 className="text-light" Header style={{marginRight: '10px', marginLeft: '10px'}}>{login} <button onClick={()=>{logout()}}>Выйти</button></h6> :
                                    <Link style={{marginRight: '10px', marginLeft: '10px'}} className="text-light"to='/login'>Войти</Link>}
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Menu;
