import './App.css';
import React from 'react'
import axios from "axios";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import TodoList from "./components/ToDo";
import ProjectList from "./components/Projects";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProjectItems from "./components/ProjectItem";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todo' :[],
            'projects': [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/').then(
            response => {
                const todo = response.data
                this.setState(
                    {'todo': todo}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/').then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))
    };

    render() {
        return (
            <div>
                 <div>
                    <BrowserRouter>
                    <Menu/>
                        <Switch>
                            <Route exact path="/users" component = {() => <UserList users={this.state.users}/> } />
                            <Route exact path="/todo" component = {() => <TodoList todo={this.state.todo}/> } />
                            <Route exact path="/projects" component = {()=> <ProjectList projects={this.state.projects}/> } />
                            <Route exact path="/projects/:id" component = {() => <ProjectItems projects={this.state.projects} users={this.state.users} todo={this.state.todo}/> }/>
                        </Switch>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
