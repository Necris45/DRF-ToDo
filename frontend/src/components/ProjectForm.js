import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', repo: '', users: '',}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.users)
        event.preventDefault()
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className='col-lg-12 col-sm-6'>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label style={{fontWeight: "bold"}}>Создать проект</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Название проекта</Form.Label>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="name"
                                           value={this.state.name_project}
                                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Ссылка на репозиторий</Form.Label>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="repo"
                                           value={this.state.repo}
                                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label>Выбрать пользователей</Form.Label>
                                    <select className="form-control" name="users" multiple
                                            onChange={(event) => this.handleUsersChange(event)}>
                                        {this.props.users.map((item) => <option
                                            value={item.id}>{item.username}</option>)}
                                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
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

export default ProjectForm