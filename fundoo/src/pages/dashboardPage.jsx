import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
import GetAllNoteComponent from '../components/getAllNoteComponent';
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.newNote = React.createRef()
    }
    searchBar = (searchText) => {
        console.log('search text in dash', searchText);
        this.setState({
            searchText: searchText
        })
    }
    display = (card) => {
        console.log('card', card);
        this.newNote.current.updatedCard(card)
    }
    render() {
        return (
            <div className="dashboardpage-maindiv">

               <div><DashboardComponent  searchBar={this.searchBar}/></div> 
               <div><CreateNotesComponent getNew={this.display}/></div> 
               <div className="dashboardpage-allnotes"><GetAllNoteComponent  ref={this.newNote}
                 searchText={this.state.searchText}/></div>
            </div>
            
        )
    }
}
export default DashboardPage;