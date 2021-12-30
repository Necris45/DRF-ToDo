import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

const TodoItem = ({todoitem,deleteTodo}) => {
    return (
        <tr>
            <td>{todoitem.project}</td>
            <td>{todoitem.taskText}</td>
            <td>{todoitem.createdAt}</td>
            <td>{todoitem.updatedAt}</td>
            <td>{todoitem.executiveUser}</td>
            <td>{todoitem.isActive}</td>
            <td><button onClick={()=>deleteTodo(todoitem.id)} className='btn-danger' type="button">Удалить</button></td>
        </tr>
    )
}

const TodoList = ({todo,deleteTodo}) => {
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
                        {todo.map((todoitem) => <TodoItem todoitem={todoitem} deleteTodo={deleteTodo}/>)}
                        </tbody>
                    </Table>
                    <div><Link className="btn-warning p-1" to="/todo/create">Создать</Link></div>
                </Col>
            </Row>
        </Container>
    )
}

export default TodoList;