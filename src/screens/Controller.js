import React, { Component } from 'react';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login />} />
                </div>
            </Router>
        )
    }
}

export default Controller;