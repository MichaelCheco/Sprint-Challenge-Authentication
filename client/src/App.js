import React, { Component } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;