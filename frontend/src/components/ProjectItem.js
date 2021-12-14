import React from "react";
import {Container,  Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams} from "react-router-dom";

const ProjectItem = ({project, users, todo}) => {
    const todolist = []
    todo.forEach((todoitem) => {
        if (todoitem.project === project.id) {
            todolist.push(todoitem.taskText, 'Поручено сотруднику с ID: ' + todoitem.executiveUser)
        }
    })
    return (
        <div>
            <p>Название проекта: {project.name} </p>
            <p>Ссылка на репозиторий: {project.repo}</p>
            <p><b>Пользователи:</b> {project.users.map((userId) => {
            // eslint-disable-next-line
                return users.find((user) => user.id == userId).username + ' (id:' + users.find((user) => user.id == userId).id + '), '
            })}</p>
            <p><b>Задачи:</b> {todolist.map((todo) => todo + ', ')}</p>
        </div>
    )
}
const ProjectItems = ({projects, users, todo}) => {
    let {id} = useParams();
    // eslint-disable-next-line
    let filtered_project = projects.filter((project) => project.id == id)

    return (
        <Container>
            <Row>
                <Col className='col-lg-12 col-sm-12
                mt-3'>
                    <p> {filtered_project.map((project) => <ProjectItem project={project} users={users}
                                                                        todo={todo}/>)}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectItems;