import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { profileUpload } from '../services/userService';
import { Avatar, Tooltip, Paper, Popper, Button, Divider, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
var Url = "http://fundoonotes.incubation.bridgelabz.com/"
class AccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            file: '',
            profileUrl: '',
            profile: false,
            pic: null,
            open: false,
            imageSet: false,
            selected: '',
            snackbarOpen: false,
            snackbarMsg: '',
            ok: false
        }
    }
    // componentDidMount() {
    //     if (localStorage.getItem("profileimage") !== 'undefined') {
    //         this.setState({
    //             pic: localStorage.getItem("profileimage")
    //         })
    //     }
    // }
    handleToggle() {
        try {
            this.setState(state => ({ open: !state.open }));
        } catch (err) {
            console.log("error at handleToggle1 in userProfile");
        }
    };
    // handleClickAway=()=>{
    //     this.setState({
    //         anchorEl:false
    //     })
    // }
    handleClick(event) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
        });
    };
    handleSignOut = async() => {
     await   this.setState({ snackbarOpen: true, snackbarMsg: "really!!!!!!" })
       
         
    }
    handleAddAccount = () => {
        this.props.history.push('/register')
    }
    profile = async (e) => {
        let data = new FormData();
        data.append('file', e.target.files[0]);
        await profileUpload(data)
            .then((result) => {
                // console.log('backend image result', result);
                localStorage.setItem('profileimage', Url + result.data.status.imageUrl);
                // var image = localStorage.getItem("profileimage");
                // console.log("image url  ", image);
                // this.setState({
                //     pic: image,
                //     imageSet: true,
                //     selected: Url + result.data.status.imageUrl
                // })
                // console.log('selected img---', this.state.selected);

                // localStorage.setItem('profileimage', this.state.selected);
            })
    }
    snackbarClose = (e) => {
        this.setState({
            anchorEl: false
        });
        this.setState({ snackbarOpen: false });
    }
    handleOk =async () => {
       await this.setState({
            ok: !this.state.ok
        })
        localStorage.clear();
        this.props.history.push('/servicecard')
    }
    render() {
        let email = localStorage.getItem("email");
        let firstName = localStorage.getItem("firstName");
        let lastName = localStorage.getItem("lastName");
        let firstChar = firstName.charAt(0);
        console.log('firstchar----', firstChar);

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}
                    message={<span id="messege-id">{this.state.snackbarMsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        > <CloseIcon />
                        </IconButton>,
                        <Button key="ok" color="primary"  size="small" onClick={this.handleOk}>
                            ok
                </Button>
                    ]}
                />
                <Tooltip title="change profile pic">
                    {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                    <Avatar src={localStorage.getItem('profileimage')} className="avatar" alt={firstChar} onClick={(event) => this.handleClick(event)} cursor="pointer"
                    ></Avatar>
                    {/* </ClickAwayListener> */}

                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} placement="bottom-end"
                    style={{
                        zIndex: "9999", width: "25%", top: "-72px"
                    }}
                >
                    <Paper className="account-paper" placement="bottom-end" >
                        {/* <ClickAwayListener onClickAway={this.handleToggle}> */}
                        <div>
                            <label className="label">
                                <div className="avtar-email-div">
                                    <Avatar className="avatar1" alt="Remy Sharp" cursor="pointer" style={{ width: "80px", height: "80px" }} >
                                        {/* {this.state.imageSet !== "" ?
                                                <img src={this.state.selected} alt="profile"></img>
                                                : */}
                                        <img src={localStorage.getItem('profileimage')} alt="profile"></img>
                                        {/* } */}
                                    </Avatar>
                                    <input type='file' id='file' onChange={(event) => this.profile(event)}
                                        style={{ display: 'none' }} />
                                    <div className="account-name-email">
                                        <span style={{ fontWeight: "bold", margin: "-36px -58px 14px 10px" }}>{firstName} {lastName}</span>
                                        <span >{email}</span>
                                    </div>
                                </div>
                                <div><Divider /></div>
                                <div className="account-buttons">
                                    <Button style={{ boxShadow: "5px 5px 5px" }} onClick={this.handleAddAccount}>Add account</Button>
                                    <Button style={{ boxShadow: "5px 5px 5px" }} onClick={this.handleSignOut}>Sign out</Button>
                                </div>
                            </label>
                        </div>
                        {/* </ClickAwayListener> */}
                    </Paper>
                </Popper>
            </div>
        )
    }
}
export default withRouter(AccountComponent)