import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import EditorComponent from '../components/editorComponent';
import {withRouter} from 'react-router-dom';
class EditorPage extends Component {
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
        console.log('editor page props',this.props);

        return (
            <div>
                  <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} /></div>
                <div className="editorPage" >
                    <EditorComponent/>
                </div>   
            </div>
        )
    }
}
export default  withRouter(EditorPage);