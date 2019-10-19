import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
import GetAllNoteComponent from '../components/getAllNoteComponent';
import { withRouter } from 'react-router-dom'
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu: false
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
    listView = (value) => {
        this.setState({
            list: value
        })
    }
    menuSelect = (menu) => {
        this.setState({
            menu: menu
        })
    }
    render() {
        return (
            <div className="dashboardpage-maindiv">

                <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} transition={this.menuSelect} /></div>
                <div><CreateNotesComponent getNew={this.display} /></div>
                <div className="dashboardpage-allnotes"><GetAllNoteComponent ref={this.newNote}
                    searchText={this.state.searchText} list={this.state.list} menu={this.state.menu}/></div>
            </div>

        )
    }
}
export default withRouter(DashboardPage);