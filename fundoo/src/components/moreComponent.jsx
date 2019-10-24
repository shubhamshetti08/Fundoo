import React, { Component } from 'react'
import { Tooltip, MenuItem, Popper, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
// import { trash } from '../services/userService';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CreateLabelComponents from './createLabelComponents';
import TrashComponent from './trashComponent'
class MoreComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            anchorEl: false,
            cardOpen: false,
            label: false,
            create: false,
            moreNoteId: '',
            noteId: '',
            title: '',
            description: ''
        }
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleKeyDown = () => {
        this.setState({
            create: true
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
        // console.log('anchor', this.state.anchorEl);
        // console.log('gdgdddd==---p-', this.props.labels)

    }
    deleteUpdate = (moreNoteId) => {
        this.setState({
            moreNoteId: moreNoteId
        })
        this.props.deleteUpdate(moreNoteId)
    }
    handleEdit = (id) => {
        var data = [
            this.props.noteID,
            this.props.title,
            this.props.description,
            "editor"

        ]
        console.log('/editor', data)

        this.props.history.push(`/editor/${id}`, data)
    }
    handleSQA = (id) => {
        var data = [
            this.props.noteID,
            this.props.title,
            this.props.description,
            "editor",
            this.props.questionAndAnswerNotes,
            true
        ]
        console.log('/editor', data)
        this.props.history.push(`/editor/${id}`, data)
    }
    // handleButton = () => {

    //     var trashNoteId = this.props.trashNoteId;
    //     var data = {
    //         noteIdList: [trashNoteId],
    //         isDeleted: true
    //     }
    //     console.log('data in trash', data);

    //     trash(data).then((res) => {
    //         console.log('res in trash after hitting', res);
    //     }).catch((err) => {
    //         console.log('error in trash ', err);
    //     })
    // }
    handleDeleteNote = (isTrash) => {
        this.props.TrashPropsToGetNote(isTrash)
    }
    handleCreateLabel = (isLabel) => {
        this.props.createLabelPropsToGetNote(isLabel)
    }
    render() {
        // console.log("more"+this.props.labels);
        return (
            // <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                >
                    <Paper className="trash-paper">
                        <MenuItem ><TrashComponent trashNoteId={this.props.noteID} deleteUpdate={this.deleteUpdate} trashToMore={this.handleDeleteNote} /></MenuItem>
                        <MenuItem ><CreateLabelComponents propsToCreateLabel={this.state.anchorEl} noteIdToLabel={this.props.noteID} noteLabels={this.props.labels} createLabelPropsToMore={this.handleCreateLabel} /></MenuItem>
                        {this.props.questionAndAnswerNotes!== undefined ?
                            this.props.questionAndAnswerNotes.length > 0 ?
                                <MenuItem onClick={() => this.handleSQA(this.props.noteID)}>Show QA</MenuItem>
                                :
                                <MenuItem onClick={()=>this.handleEdit(this.props.noteID)}> Ask question </MenuItem>
                            : (null)
                        }
                    </Paper>
                </Popper>
            </div>
            //  </ClickAwayListener>          
        )
    }
}
export default withRouter(MoreComponent)
{/* <CreateLabelComponenent noteToLabel={this.props.noteId}
createLabelToMoreOption={this.createLabelToMoreOption} />
{this.props.completeNote.questionAndAnswerNotes.length !== undefined ?
this.props.completeNote.questionAndAnswerNotes.length > 0 ?
    <Button onClick={() => this.handleSQA(this.props.completeNote.id)}>Show QA</Button>
    :
    <Button onClick={() => this.handleQA(this.props.completeNote.id)}>Ask QA</Button>
: (null)
}
handleQA = (id) => {
console.log("this.props", this.props.completeNote);
this.state.data.push(this.props.completeNote.id);
this.state.data.push(this.props.completeNote.title);
this.state.data.push(this.props.completeNote.description);
this.props.history.push(`/quesAns/${id}`, this.state.data);
}

handleSQA = (id) => {
console.log("this.props", this.props.completeNote);
this.state.data.push(this.props.completeNote.id);
this.state.data.push(this.props.completeNote.title);
this.state.data.push(this.props.completeNote.description);
this.state.data.push(true);
this.state.data.push(this.props.completeNote.questionAndAnswerNotes);
this.props.history.push(`/quesAns/${id}`, this.state.data);
} */}
