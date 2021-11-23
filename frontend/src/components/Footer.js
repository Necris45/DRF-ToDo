import React from "react";
import {Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
    return(
        <Container>
            <Row>
                <Col className='col-lg-12 col-sm-12  m-0'>
                    <div  className='fixed-bottom bg-dark'>
                        <p className='text-center text-light  '>Эти стили делал по аналогии с прошлым курсом и вроде получилось </p>
                        <p className='text-center text-light  '>Copyright &copy; 2021 </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Footer;