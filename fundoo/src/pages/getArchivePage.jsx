import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import GetArchiveComponent from '../components/getArchiveComponent';
class GetArchivePage extends Component {
        constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu:false,
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
            <div>
                  <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} transition={this.menuSelect}/></div>
                <div className="getArchivepage-allnotes">
                    <GetArchiveComponent ref={this.newNote} list={this.state.list}  searchText={this.state.searchText} menu={this.state.menu} />
                </div>   
            </div>
        )
    }
}
export default GetArchivePage;