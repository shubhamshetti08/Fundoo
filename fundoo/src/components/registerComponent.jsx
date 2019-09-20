import React from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import ServiceCard from './serviceCardComponent';
import {withRouter} from 'react-router-dom';
import {userRegister} from '../services/userService'
 class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            openSnackBar:''
        }
    }
    onChangeFirstName = (e) => {
        //this.setState({ [e.target.name]: e.target.value });
        var firstName = e.target.value;
        this.setState({
          firstName: firstName
        })
      }
      onChangeLastName = (e) => {
        var lastName = e.target.value;
        this.setState({
          lastName: lastName
        })
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
      onChangeConfirmPassword = (e) => {
        var confirmPassword = e.target.value;
        this.setState({
          confirmPassword:confirmPassword
        })
      }
      handleCart=()=>{
        this.props.history.push('/serviceCard')
      }
    handleSubmit=()=>{
        var regDetails = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'service': this.props.location.state.cartName,
            'email': this.state.email,
            'password': this.state.password,
            'cartId': this.props.location.state.idCart
        }
        

    userRegister(regDetails).then((res) => {
        console.log('res from backend', res)
        // this.setState({
        //     openSnackBar: true,
        //     SnackBarMessage: 'Registration Successfull'
        // })
        this.props.history.push('/login')
    }).catch((err) => {
        console.log('errr', err);
    })
    }
    signInInstead = (changeColor, productId, status) => {
        var loginData = {
            changeColor: changeColor,
             productId: productId,
            status: status
        }
        this.props.history.push('/login', loginData);
    }
    render() {
      //  console.log('register-cartname', this.props.location.state.productIdCart);
        
        var changeColor = "",  productId = "",  status = "";
        if (this.props.location.state !== undefined) {
            changeColor = "orange"
             productId = this.props.location.state.productIdCart
            status = "Selected"
        }
        return (
            <div className='registerPage'>
        <Card className='registerCard'>
        <div className='register-fundoo'><h1 className='register-h1'><span style={{ color: "#2196f3" }}>f</span>
                    <span style={{ color: "#b71c1c" }}>u</span>
                    <span style={{ color: "#ffc107" }}>n</span>
                    <span style={{ color: "#1976d2" }}>d</span>
                    <span style={{ color: "#43a047" }}>o</span>
                    <span style={{ color: "#b71c1c" }}>o</span></h1><Button onClick={this.handleCart} style={{color:'blue'}}>cart</Button> 
                    </div>
                    <div className='register-h2'><h2>Create your Fundoo Account</h2></div>
                    <div className='register-names'>
                    <TextField
                        required
                        variant="outlined"
                        id="firstname-input"
                        label="Enter FirstName"
                        type="text"
                        name="firstName"
                        margin="normal"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                    />
                     <TextField
                        required
                        variant="outlined"
                        id="lastname-input"
                        label="Enter LastName"
                        type="text"
                        name="lastName"
                        margin="normal"
                        value={this.state.lastName}
                        onChange={this.onChangeLastName}
                    />
                    </div>
                    <div className='register-email'>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        id="email-input"
                        label="Enter Email"
                        type="email"
                        name="email"
                        margin="normal"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                    </div>
                    <div className="register-password">
                    <TextField
                        required
                        variant="outlined"
                        id="pass-input"
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                     <TextField
                        required
                        variant="outlined"
                        id="conpass-input"
                        label="confirmPassword"
                        type="password"
                        name="confirmpassword"
                        margin="normal"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                    />
                    </div>
                    <div>
                        <ServiceCard cardProps={true}
                             productId={productId}
                            status={status}
                            changeColor={changeColor}
                        />
                    </div>
                    {/* <div className='register-cardtag'>
                        <ServiceCard cardProps={true}></ServiceCard>
                    </div> */}
                    <div className='register-submitButton'>
                    <Button onClick={this.handleSubmit} color='primary'variant="contained" >
                        submit
                    </Button>
                      <Button variant="contained" color="primary" id="regbutton" onClick={() => this.signInInstead(changeColor, productId, status)}>
                            sign in instead
                        </Button>
                </div>

        </Card>
        </div>
            );
    }
}
export default withRouter(Register);