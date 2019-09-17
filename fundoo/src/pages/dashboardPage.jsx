import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
class DashboardPage extends Component {
    render() {
        return (
            <div>

               <div><DashboardComponent props={this.props}/></div> 
               <div><CreateNotesComponent props={this.props}/></div> 
            </div>
            
        )
    }
}

export default DashboardPage;