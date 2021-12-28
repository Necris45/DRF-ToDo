import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', projects: '', }
    }

    dataSearch(event) {
        if (event.target.value) {
            const name = event.target.value.toLowerCase()
            const filter = this.props.projects.filter(project => project.name.toLowerCase().indexOf(name) !== -1)
            this.props.searchProject(name, filter)
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3 className='text-center mt-3'>Проекты</h3>
                        <div className="searchbar form-group"><input value={this.state.name} name='name' id='7'
                                                                     type="text" className="form-control"
                                                                     placeholder="Поиск проекта по названию"
                                                                     onChange={(event) => this.dataSearch(event)}/>
                        </div>
                        <Table striped bordered hover size='sm' className='mt-4 mb-5'>
                            <thead>
                            <tr>
                                <th>Название проекта</th>
                                <th>Ссылка на репозиторий</th>
                                <th>ID пользователей</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.projects.map((project) =>
                                <tr>
                                    <td><Link to={`${project.id}/`}> {project.name} </Link></td>
                                    <td>{project.repo}</td>
                                    <td>{project.users.join(', ')}</td>
                                    <td>
                                        <button onClick={() => this.props.deleteProject(project.id)}
                                                className='btn-danger' type="button">Удалить
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <div><Link className="btn-warning p-1" to="/project/create/">Создать</Link></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchProject
