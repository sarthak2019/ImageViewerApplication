import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Login extends Component {
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Header />
            </div>
        )
    }
}

export default Login;