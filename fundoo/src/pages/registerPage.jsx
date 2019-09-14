import React, { Component } from 'react'
import RegisterComponent from '../components/registerComponent';
 class registerPage extends Component {   
    render() {
        console.log('productid-----',this.props);
        return (
            <div>
                <RegisterComponent/>
            </div>
        )
    }
}
export default registerPage;
