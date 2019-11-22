import React, { Component } from 'react'
import PaymentComponent from '../Components/paymentComponent'
import DashboardComponent from '../Components/DashboardComponent'
 class payment extends Component {
    render() {
        return (
            <div>
                <PaymentComponent/>
                <DashboardComponent/>
            </div>
        )
    }
}
export default payment