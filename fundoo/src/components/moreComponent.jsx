import React, { Component } from 'react'
import { Tooltip,MenuItem,Popper,Paper} from '@material-ui/core';
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
            label:false,
            create:false,
            moreNoteId:''
        }
    }
    handleClickAway=()=>{
        this.setState({
            anchorEl:false
        })
    }
    handleKeyDown = () => {
        this.setState({
            create: true
        })
    }
   
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ?  !this.state.anchorEl : e.target
        })
        console.log('anchor',this.state.anchorEl);
        console.log('gdgdddd==---p-',this.props.labels)
        
    }
    deleteUpdate=(moreNoteId)=>{
        this.setState({
moreNoteId:moreNoteId
        })
        this.props.deleteUpdate(moreNoteId)
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
    handleDeleteNote=(isTrash)=>{
        this.props.TrashPropsToGetNote(isTrash)
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
                    <MenuItem ><TrashComponent trashNoteId={this.props.noteID} deleteUpdate={this.deleteUpdate} trashToMore={this.handleDeleteNote}/></MenuItem>
                        <MenuItem ><CreateLabelComponents noteIdToLabel={this.props.noteID} noteLabels={this.props.labels}/></MenuItem>
                    </Paper>
                </Popper>
            
            </div>
            //  </ClickAwayListener>
           
        )
    }
}
export default withRouter(MoreComponent)