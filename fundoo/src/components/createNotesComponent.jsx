import React, { Component } from 'react'
import { Card, InputBase, Tooltip, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import {addNotes} from '../services/userService'
// import { withRouter } from 'react-router-dom'
const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            multiline: {
                padding: "0px 0 0px"
            }
        }, MuiPaper: {
            rounded: {
                borderRadius: "10px"
            }
        }
    }
})
class CreateNotesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            takeNote: false,
            description: '',
            title: ''
        }
    }
    handleNotes = () => {
        this.setState({
            takeNote: true
        })
    }
    handleTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleDescription = (e) => {
        var description = e.target.value;
        this.setState({
            description: description
        })
    }
    handleClose = () => {

        var data = {
            title: this.state.title,
            description: this.state.description
        }
        console.log("jedfewh", data)
        addNotes(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        this.setState({
            takeNote:false,
            title:'',
            description:''
        })
    }
    render() {
        return (
            <div className="createNotes-page" >
                {this.state.takeNote ? (
                    <Card className="createNotes-card2">
                        <div className="createNotes-card2-div1">
                            <div className="createNotes-card2-div2">
                                <InputBase className="createNotes-input"
                                    style={{ paddingLeft: "10px", paddingTop: "20px" }}
                                    type="text"
                                    fullWidth
                                    spellCheck={true}
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleTitle}
                                >
                                </InputBase>
                            </div>
                            <div className="createNotes-card2-takeNotes">
                                <InputBase className="createNotes-input"
                                    style={{ paddingLeft: "10px", paddingTop: "20px" }}
                                    type="text"
                                    multiline
                                    fullWidth
                                    spellCheck={true}
                                    placeholder="Take a note...."
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                >
                                </InputBase>
                            </div>
                        </div>
                        <div className="notes-icons">
                            <div className="notes-icon-div ">
                                <Tooltip title="Remind me">
                                    < AddAlertOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Collaborator">
                                    <PersonAddOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Change color">
                                    <ColorLensOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="add image">
                                    <ImageOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <ArchiveOutlinedIcon/>
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreVertOutlinedIcon />
                                </Tooltip>
                            </div>
                            <Button style={{ paddingRight: "10px" }}
                                onClick={this.handleClose}><b>
                                    Close</b>
                            </Button>
                        </div>
                    </Card>
                ) : (
                        <MuiThemeProvider theme={theme}>
                            <Card className="createNotes-card1" >
                                <div className="createNotes-card1-div1">
                                    <div className="createNotes-card1-div2">
                                        <InputBase className="createNotes-input"
                                            multiline
                                            spellCheck={true}
                                            placeholder="Take a note...."
                                            onClick={this.handleNotes}>
                                        </InputBase>
                                    </div>
                                </div>
                            </Card>
                        </MuiThemeProvider>
                    )
                }
            </div>
        )
    }
}
export default CreateNotesComponent