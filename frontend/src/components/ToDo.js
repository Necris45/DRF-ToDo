import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

const TodoItem = ({todoitem}) => {
    return (
        <tr>
            <td>{todoitem.project}</td>
            <td>{todoitem.taskText}</td>
            <td>{todoitem.createdAt}</td>
            <td>{todoitem.updatedAt}</td>
            <td>{todoitem.executiveUser}</td>
            <td>{todoitem.isActive}</td>
        </tr>
    )
}

const TodoList = ({todo}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-12 col-sm-12'>
                     <h3 className='text-center mt-3'>TODO-листы</h3>
                    <Table striped bordered hover size='sm' className='mt-4 mb-4'>
                        <thead>
                        <tr>
                            <th>Project</th>
                            <th>Text</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th>User</th>
                            <th>Active</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todo.map((todoitem) => <TodoItem todoitem={todoitem}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default TodoList;