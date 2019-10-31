import React, { Component } from 'react'
import {
    Dialog, Card, DialogTitle, DialogContent, Button, InputBase, Divider,
    Avatar, MenuItem, MuiThemeProvider, createMuiTheme, Tooltip
} from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { removeCollabNotes, searchUserList, addCollaboratorNotes, getUserEmails, getAllNotes } from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        MuiDialogContent: {
            root: {
                padding: "0px 0px"
            }
        }
    }
})
class CollaboratorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            notes: [],
            collabName: '',
            searchText: '',
            dialogOpen: false,
            AllCollaborators: [],
            trueIcon: false,
            card: false,
            filteredEmails: '',
            searchData: [],

        }
    }
    componentWillMount = () => {
        this.getEmails();
    }
    handleCollabChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }

    handleTrueIcon = () => {
        this.setState({
            trueIcon: true
        })
    }
    handleDialoge = () => {
        this.setState({
            open: !this.state.open
        })
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            // console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    getEmails = () => {
        getUserEmails().then((res) => {
            let users = res.data.map((key) => {
                return key.email
            })
            this.setState({
                AllCollaborators: users
            })
        }).catch(err => {
            console.log("err in hitting user api", err);
        })
    }

    handleSearch = () => {
        const filteredEmail = this.state.AllCollaborators.filter(email => {
            return email.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        })
        if (this.searchText === '') {
            this.setState({
                trueIcon: false
            })
        }
        this.setState({
            card: true,
            filteredEmails: filteredEmail
        })
    }
    handleCollabChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    handleClear = (userId) => {
        let data = {
            id: this.props.noteToCollab,
            collaboratorUserId: userId
        }
        console.log("collab id", data);
        removeCollabNotes(data).then((res) => {
            console.log("res after hitting remove collaborator api is ", res);
            this.props.remCollab(true);
            this.getNotes();
        }).catch((err) => {
            console.log("err in hitting collaborator api", err);
        })
    }
    handleSave = () => {
        var data1 = {}
        let data = {
            "searchWord": this.state.searchText
        }
        searchUserList(data).then((res) => {
            console.log("res in search user list is", res);
            this.setState({
                searchData: res.data.data.details
            })
            console.log("res.data in collab is ", res.data.data.details[0].email);
            data1 = {
                "email": res.data.data.details[0].email,
                "firstName": res.data.data.details[0].firstName,
                "lastName": res.data.data.details[0].lastName,
                "userId": res.data.data.details[0].userId
            }
            console.log("this.props.noteTo", data1);
            addCollaboratorNotes(data1, this.props.noteToCollab).then((res) => {
                console.log("res after hitting adding collaborator api is ", res);
                this.setState({
                    searchText: ''
                })
                this.props.propsToCreateNote(this.state.AllCollaborators);
                this.props.addCollab(true);
                this.getNotes();
            }).catch((err) => {
                console.log("err in hitting collaborator api", err);
            })
            console.log("data1---------->", data1);

        }).catch(err => {
            console.log("err in hitting search user api ", err);
        })
    }
    handleCancel = () => {
        this.setState({
            dialogOpen: false,
        })
    }
    handleMenu = (e) => {
        this.setState({
            searchText: e.target.textContent,
            card: false
        })
        console.log("search text is ", this.state.searchText);
    }
    handleCollabChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    render() {
        return (
            <div>
                <div onClick={this.handleDialoge}>
                    <PersonAddOutlinedIcon />
                </div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Dialog position="static"
                            // onClose={this.handleClose}
                            open={this.state.open}
                        // aria-labelledby="alert-dialog-title"
                        // aria-describedby="alert-dialog-description"
                        >
                            <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdate }}>
                                {/* this.state.colorUpdated */}
                                <DialogTitle>
                                    Collaborators
                                </DialogTitle>
                                <Divider />
                                <DialogContent>
                                    <div>
                                        <div className="collaborator-avtar-email">
                                            <div className="collaborator-firstAvatar">
                                                <Avatar style={{ width: "35px", height: "35px" }}>
                                                    <img alt="pic"
                                                        style={{
                                                            width: "-webkit-fill-available",
                                                            height: "-webkit-fill-available",
                                                        }}
                                                        src={localStorage.getItem('profileimage')}
                                                    />
                                                </Avatar>
                                            </div>
                                            <div className="collaborator-name-email">
                                                <span style={{ fontFamily: 'Roboto' }}>
                                                    <b>{localStorage.getItem('firstName')}
                                                        {localStorage.getItem('lastName')}
                                                    </b>
                                                    <span style={{ fontFamily: "Roboto arial sansSerif", paddingLeft: "10px" }}>
                                                        (owner)</span>
                                                </span>
                                                <br />
                                                {localStorage.getItem('email')}
                                            </div>
                                        </div>
                                        {this.state.notes.map(key => {
                                            // console.log("this.porops.collab", this.props.noteToCollab);
                                            return (
                                                key.id === this.props.noteToCollab ?
                                                    <div className="map-container">
                                                        <div className="secondCollab-avatar">
                                                            <div className="secondCollab-secondAvatar">
                                                                {key.collaborators.map(col => {
                                                                    return (
                                                                        <div className="para-collab">
                                                                            <Tooltip title={col.email}>
                                                                                <Avatar style={{
                                                                                    cursor: "pointer",
                                                                                    width: "35px", height: "35px"
                                                                                }}>
                                                                                    {col.firstName.toUpperCase().charAt(0)}
                                                                                </Avatar>
                                                                            </Tooltip>
                                                                            <span style={{ fontFamily: 'Roboto' }}>
                                                                                {col.email}
                                                                            </span>
                                                                            <ClearOutlinedIcon
                                                                                onClick={() => this.handleClear(col.userId)} />
                                                                        </div>
                                                                    )
                                                                })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : (null))
                                        })
                                        }
                                        <div>
                                            <div className="collaborator-avtar-email">
                                                <div className="collaborator-secondAvatar">
                                                    <Avatar style={{ width: "35px", height: "35px" }}>
                                                        <PersonAddOutlinedIcon />
                                                    </Avatar>
                                                </div>
                                                <div className="collaborator-name-email">
                                                    <InputBase className="get-in2"
                                                        fullWidth
                                                        placeholder="person or email to share with"
                                                        id="addperson"
                                                        value={this.state.searchText}
                                                        onKeyDown={this.handleTrueIcon}
                                                        onChange={this.handleCollabChange}
                                                        onKeyUp={this.handleSearch}
                                                    />
                                                </div>
                                                {this.state.trueIcon ? <DoneOutlinedIcon onClick={this.handleDone} />

                                                    : (null)}</div>
                                            <div className="collab-card">
                                                {
                                                    this.state.card !== false && this.state.searchText !== '' ?
                                                        <Card className="collab-card1" style={{ height: "150px", overflowY: "scroll" }}>
                                                            {this.state.filteredEmails.map((key) => {
                                                                return (
                                                                    <div className="collab-map">
                                                                        <MenuItem onClick={this.handleMenu}>
                                                                            {key}
                                                                        </MenuItem>
                                                                    </div>
                                                                )
                                                            })}
                                                        </Card>
                                                        :
                                                        (null)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="collaborator-buttons">
                                            <div >
                                                <Button
                                                    onClick={this.handleClose}>
                                                    close
                                        </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={this.handleSave}>
                                                    save
                                        </Button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Card>
                        </Dialog>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default CollaboratorComponent