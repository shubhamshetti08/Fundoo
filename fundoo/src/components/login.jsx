import React from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
//import { blue } from '@material-ui/core/colors';
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            snackbarOpen: false,
            snackbarMsg: ''
        }
    }
    snackbarClose = (e) => {
        this.setState({ snackbarOpen: false });
      }
      handleClick = () => {
        // console.log(this.state.email.length)
        // console.log(this.state.password)
        // if (this.state.email === "") {
        //   this.setState({ snackbarOpen: true, snackbarMsg: "email cannot be empty" })
        // } else if (this.state.password === null || this.state.password.length < 8) {
        //   this.setState({ snackbarOpen: true, snackbarMsg: "password should be min 8" })
        // } else {
        //   Controller.login(this.state.email, this.state.password);
        //   this.setState({ snackbarOpen: true, snackbarMsg: "login successfull" })
        // this.props.history.push('/dashboard');
        // }
      }
    render() {
        return (
            <Card className="loginCard">
                <div className='fundoo'><h1><span style={{ color: "#2196f3" }}>f</span>
                    <span style={{ color: "#b71c1c" }}>u</span>
                    <span style={{ color: "#ffc107" }}>n</span>
                    <span style={{ color: "#1976d2" }}>d</span>
                    <span style={{ color: "#43a047" }}>o</span>
                    <span style={{ color: "#b71c1c" }}>o</span></h1></div>
                <div className='loginEmail'>
                    <TextField
                        required
                        id="outlined-email-input"
                        label="Enter Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>
                <div className='loginPassword'>
                    <TextField
                        required
                        id="outlined-pass-input"
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className='loginButton'>
                    <Button onClick={this.handleClick} variant="contained">
                        Login
                    </Button>
                </div>
                <div className='createAccountButton'>
                    <Button onClick={this.handleCreateAccClick}>
                        Create Account
                    </Button >
                </div>
                <div className='resetPsswordButton'>
                    <Button onClick={this.handleForgotClick} color='secondary' >
                        Reset Password??
                    </Button>
                </div>

            </Card>
        );
    }
}
