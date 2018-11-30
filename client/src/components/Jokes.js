import React, { Component } from 'react';
import axios from 'axios';

export default class Jokes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jokes: [],
            loggedIn: false
        }
    }
    authenticate = () => {
        const token = localStorage.getItem('token')
        const options = {
            headers: {
                authorization: token
            }
        }
        if (token) {
            axios.get('http://localhost:9000/api/jokes', options)
            .then(res => {
                if(res.data) { 
                    this.setState({loggedIn: true, jokes: res.data})
                } else {
                    throw new Error()
                }
            })
            .catch(err => {
                this.props.history.push('/login')
            })
        } else {
            this.props.history.push('/login')
        }
    }
    componentDidMount() {
        this.authenticate()
    }
    componentDidUpdate(prevProps, prevState) {
        const { pathname } = this.props.history;
        if(pathname === '/' && pathname !== prevProps.history.pathname) {
            this.authenticate()
        }
    }
    render() {
        if (this.state.jokes) {
            return (
                <div>
                    {this.state.jokes.map(joke => <p key={joke.id}>{joke.setup}</p>)}
                </div>
            )
        } else {
            return (
                <h1>Log in UwU</h1>
            )
        }
    }
}