import React, { Component } from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
//import Login from '../screens/login/Login';
//import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login />} />
                    <Route path='/home' component={Home} />
                    {/*<Route exact path='/' render={(props) => <Login />} />
                    <Route path='/home' component={Home} /> */}
		            <Route path='/profile' component={Profile} />
                </div>
            </Router>
        )
    }
}

export default Controller;