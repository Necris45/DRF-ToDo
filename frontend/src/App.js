import './App.css';
import React from 'react'
import axios from "axios";
import Cookies from 'universal-cookie';
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import TodoList from "./components/ToDo";
import ProjectList from "./components/Projects";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProjectItems from "./components/ProjectItem";
import NotFound404 from './components/404.js';
import LoginForm from './components/Auth.js';
import DefaultPage from './components/DefaultPage.js';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todo' :[],
            'projects': [],
            'token': '',
            'login': ''
        };
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        localStorage.setItem('login', username)
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        let username = localStorage.getItem('login')
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'], username)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data () {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => {console.log(error)
        this.setState({users: []})}
        )

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(
            response => {
                const todo = response.data
                this.setState(
                    {'todo': todo}
                )
            }
        ).catch(error => {console.log(error)
        this.setState({todo: []})}
        )

        axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => {console.log(error)
        this.setState({projects: []})}
        )
    };

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div>
                 <div>
                    <BrowserRouter>
                    <Menu is_authenticated={this.is_authenticated.bind(this)}
                          logout={() => {this.logout()}} login={this.state.login}/>
                        <Switch>
                            <Route exact path="/users" component = {() => <UserList users={this.state.users}/> } />
                            <Route exact path="/todo" component = {() => <TodoList todo={this.state.todo}/> } />
                            <Route exact path="/projects" component = {()=> <ProjectList projects={this.state.projects}/> } />
                            <Route exact path="/projects/:id" component = {() => <ProjectItems projects={this.state.projects} users={this.state.users} todo={this.state.todo}/> }/>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />} />
                            <Route exact path='/' component={DefaultPage}/>
                            <Route component={NotFound404}/>

                        </Switch>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
