import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import GetTrashComponent from '../components/getTrashComponent';
class GetTrashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false
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
    render() {
        return (
            <div>
                  <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} /></div>
                <div className="getArchivepage-allnotes">
                    <GetTrashComponent ref={this.newNote} list={this.state.list}  searchText={this.state.searchText} />
                </div>   
            </div>
        )
    }
}
export default GetTrashPage;