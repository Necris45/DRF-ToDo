import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: '',task_text: '', executive_user:'',}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project,this.state.task_text,this.state.executive_user)
        event.preventDefault()
    }

    render() {
        return (
             <div>
                <Container>
                    <Row className='justify-content-center mt-4'>
                        <Col className='col-lg-6 col-sm-6'>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label style={{fontWeight: "bold"}}>Создать Задачу</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Текст задачи</Form.Label>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="task_text" value={this.state.task_text}
                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label>Выбрать пользователя</Form.Label>
                                    <select className="form-control" name="executive_user"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.id}>
                                {item.username}
                            </option>)}
                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                     <Form.Label>Выбрать проект</Form.Label>
                                   <select className="form-control" name="project"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) =>
                            <option value={item.id}>
                                {item.name}
                            </option>)}
                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <input className="btn-success" type="submit" value="Сохранить"/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default TodoForm