import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

const ProjectItem = ({project, users}) => {
    return (
        <tr>
            <td><Link to ={`projects/${project.id}`}> {project.name} </Link></td>
            <td>{project.repo}</td>
            <td>{project.users}</td>
        </tr>
    )
}
const ProjectList = ({projects}) => {

    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12'>
                    <h3 className='text-center mt-3'>Проекты</h3>
                    <Table striped bordered hover size='sm' className='mt-4 mb-5'>
                        <thead>
                        <tr>
                            <th>Name Project</th>
                            <th>Link</th>
                            <th>Users</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((project) => <ProjectItem project={project}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default ProjectList;