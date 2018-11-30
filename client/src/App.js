import React, { Component } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    const token = localStorage.getItem('token')
    return (
      <div className="App">
        <header>
          <img src={logo} alt="react logo" style={{width: '200px'}}/>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="register">register</NavLink>
          </nav>
        </header>
       
        <Switch>
          <Route exact path='/' render={(props) => (
            <Jokes {...props} />
          )} />
    
          <Route path='/register' 
            render={(props) => (
              <Register {...props} />
            )} 
          />
    
          <Route path='/login' 
            render={(props) => (
              <Login {...props} />
            )} 
          />
        </Switch>
        {token ? <button onClick={() => {localStorage.removeItem('token'); window.location.reload()}}>Logout</button> : null}
      </div>
    );
  }
}

export default withRouter(App);