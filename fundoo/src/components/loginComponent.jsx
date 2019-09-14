import React from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import { userLogin } from '../services/userService';
import ServiceCard from './serviceCardComponent';
//import { blue } from '@material-ui/core/colors';
import {withRouter} from 'react-router-dom';
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            snackbarOpen: false,
            // snackbarMsg: ''
        }
    }
    onChangeEmail = (e) => {
        var email = e.target.value;
        this.setState({
          email: email
        })
      }
      onChangePassword = (e) => {
        var password = e.target.value;
        this.setState({
          password:password
        })
      }
    // snackbarClose = (e) => {
    //     this.setState({ snackbarOpen: false });
    //   }
      handleLogin = () => {
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
        var loginDetails = {
            'service': this.props.location.state.cartName,
            'email': this.state.email,
            'password': this.state.password,
            'cartId': this.props.location.state.idCart
        }

    userLogin(loginDetails).then((res) => {
        console.log('res from backend', res)
        // this.setState({
        //     openSnackBar: true,
        //     SnackBarMessage: 'Registration Successfull'
        // })
        // localStorage.setItem('id',res.data.id);
        // localStorage.setItem('firstName',res.data.firstName);
        // localStorage.setItem('lastName',res.data.lastName);
        // localStorage.setItem('email',res.data.email);
        this.props.history.push('/dashboard')
    }).catch((err) => {
        console.log('errr', err);
    })
    }
    render() {
        var changeColor = "",  productId = "", cart = "", status = "";
        if (this.props.location.state !== 'undefined') {
            changeColor = "orange"
             productId = this.props.location.state.productIdCart
            status = "Selected"
        }
        return (
            <div className='loginPage'>
            <Card className="loginCard">
                <div className='fundoo'><h1><span style={{ color: "#2196f3" }}>f</span>
                    <span style={{ color: "#b71c1c" }}>u</span>
                    <span style={{ color: "#ffc107" }}>n</span>
                    <span style={{ color: "#1976d2" }}>d</span>
                    <span style={{ color: "#43a047" }}>o</span>
                    <span style={{ color: "#b71c1c" }}>o</span></h1></div>
                    <div className='login-h2'><h2>Login with fundoo account</h2></div>
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
                    <Button color='primary' onClick={this.handleLogin(changeColor, productId, cart, status)} variant="contained">
                        Login
                    </Button>
                </div>
                <div className='createAccountButton'>
                    <Button color='primary' onClick={this.handleCreateAccClick}>
                        Create Account
                    </Button >
                </div>
                <div className='resetPsswordButton'>
                    <Button onClick={this.handleForgotClick} color='secondary' >
                        Reset Password??
                    </Button>
                </div>

            </Card>
            {(this.props.location.state !== 'undefined')?
            <Card style={{backgroundColor:"gray"}} className="login-importcard">
            <ServiceCard cardProps={true}
                 productId={productId}
                status={status}
                changeColor={changeColor}
            />
        </Card>:null}
        </div>
        );
    }
}
export default withRouter(login);