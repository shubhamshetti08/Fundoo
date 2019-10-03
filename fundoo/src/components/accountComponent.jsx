import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { profileUpload } from '../services/userService'
import { Avatar, Tooltip, Paper, Popper, ClickAwayListener, Button, Divider } from '@material-ui/core';
class AccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            file: '',
            profileUrl: '',
            profile: false
        }
    }
    componentDidMount() {
        let profile = localStorage.getItem('image');
        this.setState({
            file: profile
        })
    }
    handleClick(event) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
        });
    };
    handleClickAway = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleSignOut = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }
    handleAddAccount = () => {
        this.props.history.push('/register')
    }
    profile = (event) => {
        console.log('nhhvk---');

        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        let image = event.target.files[0];
        profileUpload(image)
            .then(upload => {
                console.log('profile', upload)
            })
            .catch(err => {
                console.log(err);

            })

    }
    render() {
        let email = localStorage.getItem("email");
        let firstName = localStorage.getItem("firstName");
        let lastName =localStorage.getItem("lastName")
        let firstLetter = firstName.charAt(0);
        return (
            <div>
                <Tooltip title="change profile pic">
                    {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                        <Avatar className="avatar" alt="Remy Sharp" src={this.state.file} onClick={(event) => this.handleClick(event)} cursor="pointer"
                         style={{color:"#dcedc8",fontSize:"40px"}}>{firstLetter}</Avatar>
                    {/* </ClickAwayListener> */}

                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                    style={{
                        zIndex: "9999", width: "25%"
                    }}
                >

                    <Paper className="account-paper" >
                        <div>
                            <label className="label">
                                <div className="avtar-email-div">
                                    <Avatar className="avatar1" alt="Remy Sharp" cursor="pointer" src={this.state.file} style={{ width: "80px", height: "80px" }} />
                                    <input type='file' id='file' onChange={this.profile} style={{ display: 'none' }} />
                                    <div className="account-name-email">
                                    <span style={{fontWeight:"bold",margin:"-36px -58px 14px 25px"}}>{firstName} {lastName}</span>
                                    <span >{email}</span>
                                    </div>
                                </div>
                                <div><Divider /></div>
                                <div className="account-buttons">
                                    <Button style={{boxShadow:"5px 5px 5px"}}onClick={this.handleAddAccount}>Add account</Button>
                                    <Button style={{boxShadow:"5px 5px 5px"}}onClick={this.handleSignOut}>Sign out</Button>
                                </div>
                            </label>
                        </div>
                    </Paper>
                </Popper>

            </div>
        )
    }
}
export default withRouter(AccountComponent)