import React, { Component } from 'react'
import LoginComponent from '../components/loginComponent';
 class LoginPage extends Component {
    render() {
        console.log('loginPage',this.props);       
        return (
            <div>
                <LoginComponent/>
            </div>
        )
    }
}
export default LoginPage;