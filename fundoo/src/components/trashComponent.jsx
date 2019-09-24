import React, { Component } from 'react'
import { Tooltip,MenuItem,ClickAwayListener  } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { trash } from '../services/userService';
class TrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            anchorEl: false,
            cardOpen: false
        }
    }
    handleClickAway=()=>{
        this.setState({
            anchorEl:false
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    handleButton = () => {

        var trashNoteId = this.props.trashNoteId;
        var data = {
            noteIdList: [trashNoteId],
            isDeleted: true
        }
        console.log('data in trash', data);

        trash(data).then((res) => {
            console.log('res in trash after hitting', res);
        }).catch((err) => {
            console.log('error in trash ', err);
        })
    }
    render() {
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                    <Paper className="trash-paper">
                        <MenuItem onClick={this.handleButton}>Delete</MenuItem>
                        <MenuItem>Add Label</MenuItem>
                    </Paper>
                </Popper>
            </div>
            </ClickAwayListener>
        )
    }
}
export default withRouter(TrashComponent)