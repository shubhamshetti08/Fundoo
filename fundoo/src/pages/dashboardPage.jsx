import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
import GetAllNoteComponent from '../components/getAllNoteComponent';
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.newNote = React.createRef()
    }
    display = (card) => {
        console.log('card', card);
        this.newNote.current.updatedCard(card)
    }
    render() {
        return (
            <div className="dashboardpage-maindiv">

               <div><DashboardComponent props={this.props}/></div> 
               <div><CreateNotesComponent getNew={this.display}/></div> 
               <div className="dashboardpage-allnotes"><GetAllNoteComponent  ref={this.newNote}/></div>
            </div>
            
        )
    }
}
export default DashboardPage;