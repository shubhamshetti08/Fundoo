import React, { Component } from 'react'
import{Card} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
export default class ForgotPassword extends Component {
    render() {
        return (
            <div className='forgotpass-page'>
                <Card className='forgotpass-card'>
                <div className='forgotpass-fundoo'><h1 className='forgotpass-h1'><span style={{ color: "#2196f3" }}>F</span>
                    <span style={{ color: "#b71c1c" }}>u</span>
                    <span style={{ color: "#ffc107" }}>n</span>
                    <span style={{ color: "#1976d2" }}>d</span>
                    <span style={{ color: "#43a047" }}>o</span>
                    <span style={{ color: "#b71c1c" }}>oss</span></h1>
                    </div>
                    <div className='forgotpass-h2'><h2>Find your email</h2></div>
                    <div className='forgotpass-email'>
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
                    <div className='forgotpass-button'>
                    <Button  color='primary'  variant="contained">
                        next
                    </Button>
                    <Button  color='primary'  variant="contained">
                        back
                    </Button>
                </div>
                </Card>
                
            </div>
        )
    }
}
