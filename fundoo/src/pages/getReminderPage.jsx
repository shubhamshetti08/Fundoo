import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent';
import GetReminderComponent from '../components/getReminderComponent'
class GetReminderPage extends Component {
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
        console.log('getRemPage',this.props);
        
        return (
            <div>

                <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} transition={this.menuSelect} /></div>
                <div><CreateNotesComponent getNew={this.display} /></div>
                <div className="dashboardpage-allnotes">
                    <GetReminderComponent ref={this.newNote} list={this.state.list}  searchText={this.state.searchText} menu={this.state.menu} />
                </div>               
            </div>
        )
    }
}
export default GetReminderPage;