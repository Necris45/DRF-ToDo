import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users, deleteUsers}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-12 col-sm-12'>
                    <h3 className='text-center mt-3'>Пользователи</h3>
                    <Table striped bordered hover size='lg' className='mt-2'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => <UserItem user={user}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UserList;
