import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
import GetAllNoteComponent from '../components/getAllNoteComponent';
class DashboardPage extends Component {
    render() {
        return (
            <div className="dashboardpage-maindiv">

               <div><DashboardComponent props={this.props}/></div> 
               <div><CreateNotesComponent props={this.props}/></div> 
               <div className="dashboardpage-allnotes"><GetAllNoteComponent props={this.props}/></div>
            </div>
            
        )
    }
}

export default DashboardPage;