import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Avatar, Tooltip, Paper,Popper,ClickAwayListener, Button, Divider } from '@material-ui/core';
 class AccountComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            anchorEl:false,
        }
    }
    handleClick(event) {
        this.setState({
        anchorEl: this.state.anchorEl ? false : event.target
        });
        };
        handleClickAway=()=>{
            this.setState({
                anchorEl:false
            })
        }
        handleSignOut=()=>{
            localStorage.clear();
            this.props.history.push('/login')
        }
    render() {
        return (
            <div>
                 <Tooltip title="change color">
            <ClickAwayListener onClickAway={this.handleClickAway}>
            <Avatar className="avatar" alt="Remy Sharp"  onClick={(event) => this.handleClick(event)} cursor="pointer" />
            </ClickAwayListener>

            </Tooltip>
            <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
              style={{
                    zIndex: "9999"
                }}
            >
                
                <Paper className="account-paper">
                    <div>
                <Avatar className="avatar1" alt="Remy Sharp"   cursor="pointer" style={{width:"80px",height:"80px"}}/>
                <div>
                    <Divider/>
                    <Button onClick={this.handleAddAccount}>Add account</Button>
                    <Button onClick={this.handleSignOut}>Sign out</Button>
                    </div>
                    </div>
                </Paper>
            </Popper>                
            </div>
        )
    }
}
export default withRouter( AccountComponent)