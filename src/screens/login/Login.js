import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Login.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Redirect } from 'react-router';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            invalidCredentials: "dispNone",
            username: "",
            password: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            redirect: false
        }
    }

    /* The below function will be called when the value of username input field gets changed. */
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    /* The below function will be called when the value of password input field gets changed. */
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }
    /* The below function will be called when the LOGIN button gets clicked. */
    loginClickHandler = () => {
        this.setState({ invalidCredentials: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        var username = "user";
        var password = "password";
        if (this.state.username !== "" && this.state.password !== "") {
            if (this.state.username === username && this.state.password === password) {
                sessionStorage.setItem("access-token", "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
                this.setState({ redirect: true })
            }
            else {
                this.setState({ invalidCredentials: "dispBlock" });
            }
        }
    }

    render() {
        const { redirect } = this.state;

        /* If value of the state variable redirect is true then the render function will redirect to /home */
        if (redirect) {
            return <Redirect to='/home' />;
        }

        return (
            <div>
                <Header screen={"Login"} />
                <Grid container justify="center">
                    <Card>
                        <CardContent>
                            <FormControl>
                                <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                                    LOGIN
                            </Typography>
                            </FormControl><br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" username={this.state.username} type="text" onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl><br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" password={this.state.password} type="password" onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.invalidCredentials}>
                                    <span className="red">Incorrect username and/or password</span>
                                </FormHelperText>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </div>

        )

    }
}

export default Login;