import React from 'react';
// import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import ServiceCard from '../components/serviceCard';
export default class login extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className='registerPage'>
        <Card className='registerCard'>
        <div className='register-fundoo'><h1 className='register-h1'><span style={{ color: "#2196f3" }}>f</span>
                    <span style={{ color: "#b71c1c" }}>u</span>
                    <span style={{ color: "#ffc107" }}>n</span>
                    <span style={{ color: "#1976d2" }}>d</span>
                    <span style={{ color: "#43a047" }}>o</span>
                    <span style={{ color: "#b71c1c" }}>o</span></h1><h3 style={{color:'blue'}}>cart</h3> 
                    </div>
                    <div className='register-h2'><h2>Create your Fundoo Account</h2></div>
                    <div className='register-names'>
                    <TextField
                        required
                        id="firstname-input"
                        label="Enter FirstName"
                        type="text"
                        name="firstName"
                        margin="normal"
                    />
                     <TextField
                        required
                        id="lastname-input"
                        label="Enter LastName"
                        type="text"
                        name="lastName"
                        margin="normal"
                    />
                    </div>
                    <div className='register-email'>
                    <TextField
                        required
                        fullWidth
                        id="email-input"
                        label="Enter Email"
                        type="email"
                        name="email"
                        margin="normal"
                    />
                    </div>
                    <div className="register-password">
                    <TextField
                        required
                        id="pass-input"
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                    />
                     <TextField
                        required
                        id="conpass-input"
                        label="confirmPassword"
                        type="password"
                        name="confirmpassword"
                        margin="normal"
                    />
                    </div>
                    <div className='register-cardtag'>
                        <ServiceCard cardProps={true}></ServiceCard>
                    </div>
        </Card>
        </div>
            )
    }
}