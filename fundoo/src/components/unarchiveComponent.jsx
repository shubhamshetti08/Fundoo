import React, { Component } from 'react'
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { archive } from '../services/userService'
class UnarchiveComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isArchived: true
        }
    }
    handleArchive = async() => {
        this.setState({
            isArchived: false
        })
        const noteId = this.props.archiveNoteId;
        var data = {
            noteIdList: [noteId],
            isArchived: false
        }
     await   archive(data).then((res) => {
            console.log('res in unarchive component', res);
            this.props.archivePropsToGetArchive(true)
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <Tooltip title="UnArchive">
                    <UnarchiveOutlinedIcon onClick={this.handleArchive}
                    />
                </Tooltip >
            </div>
        )
    }
}
export default withRouter(UnarchiveComponent)
