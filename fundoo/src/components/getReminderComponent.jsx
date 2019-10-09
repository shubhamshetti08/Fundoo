import React, { Component } from 'react'
import { colorChange, updateNotes, deleteLabels, deleteReminder, getReminder,getAllNotes } from '../services/userService'
import { Card, InputBase, Tooltip, Chip } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import ArchiveComponent from './archiveComponent';
import MoreComponent from './moreComponent';
// import ReminderComponent from './reminderComponent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { withRouter } from 'react-router-dom'
// import {  } from 'date-fns/esm/locale';
const themes = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                fontSize: "1.2rem"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(11,11,11,0.06)"
            }
        }, MuiPaper: {
            elevation24: {
                boxShadow: "none"
            }
        }
    }
})
function titleDescSearch(searchText) {
    return function (val) {
        return val.title.includes(searchText) || val.description.includes(searchText)
    }
}
class GetReminderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminder: [],
            notes:[],
            open: false,
            noteId: '',
            title: '',
            description: '',
            colorUpdated: '',
            colorUpdate: '',
            color: '',
            id: '',
            trashId: ''
        }
    }
    componentDidMount() {

        this.getRem();
        this.getNotes();
    }
    handleDelete = (labelId, noteIdToLabel) => {
        var data = {
            "labelId": labelId,
            "noteId": noteIdToLabel
        }
        deleteLabels(data, noteIdToLabel, labelId)
            .then((response) => {
                // console.log("response in getReminder comp deleteLabel", response);
                this.getNotes();
            }).catch((err) => {
                console.log("error  in getReminder comp deleteLabel", err);
            })
    }
    handleDeleteReminder = (noteId) => {
        var data = {
            noteIdList: [noteId]
        }
        deleteReminder(data)
            .then((response) => {
                // console.log("response in getReminder delete reminder", response);
                this.getRem();
            }).catch((err) => {
                console.log("error in getReminder  delete reminder", err);
            })
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleNoteClick = () => {
        this.setState({
            open: true
        })
    }
    getRem = () => {
        getReminder().then((res) => {
            // console.log('response in getREM--', res);
            this.setState({
                reminder: res.data.data.data
            })
        })
    }
    updatedCard(card) {
        this.setState({
            notes: [...this.state.notes, card]
        })
    }
    handleColor = (col, noteid) => {
        var data = {
            noteIdList: [noteid],
            color: col
        }
        this.setState({
            colorUpdate: col
        })
        console.log('data in get', data);

        colorChange(data)
            .then((res) => {
                // console.log('color change res', res);
                this.getNotes();
            }).catch((err) => {
                console.log(err);
            })
    }
    handleUpdateTitle = (e) => {
        var title = e.target.value
        this.setState({
            title: title
        })
    }
    handleUpdateDescription = (e) => {
        var description = e.target.value
        this.setState({
            description: description
        })
    }
    handleUpdate = (id, oldTitle, oldDescription, colorUpdate) => {
        console.log('=====', id)
        this.setState({
            open: !this.state.open,
            noteId: id,
            title: oldTitle,
            description: oldDescription,
            colorUpdate: colorUpdate,
        })
        var data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description
        }
        console.log("data to be upadated----", data.noteId);
        updateNotes(data)
            .then((res) => {
                this.getNotes();
                console.log('response in get notes (update)', res)
            })
            .catch((err) => {
                console.log('err in get all notes update is ', err);
            })
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            // console.log('response after getnote', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    handleTrashInGetnote = (isTrash) => {
        if (isTrash) {
            this.getNotes()
        }
    }
    handleReminderInGetReminder = (isRem) => {
        if (isRem) {
            this.getNotes()
        }
    }
    handleCreateLabel = (isLabel) => {
        if (isLabel) {
            this.getNotes()
        }
    }

    render() {
        const list = this.props.list ? "container1" : "container";
        const list1 = this.props.list ? "get-contents1" : "get-contents"
        const list2 = this.props.list ? "get-card2" : "get-card1"

        const allReminder = this.state.reminder.filter(titleDescSearch(this.props.searchText)).map((key) => {
            console.log('getRem comp---',key.id);
            
            if (key.isArchived === false && key.isDeleted === false) {
                return (
                    <div className={list1}>
                        <Card className={list2} style={{ backgroundColor: key.color, boxShadow: " 5px 5px 5px gray" }}
                        >
                            <div style={{ paddingLeft: "20px", paddingTop: "20px" }} >
                                <div className="input1">
                                    <InputBase className="get-in2"
                                        multiline
                                        placeholder="Title"
                                        id="title"
                                        value={key.title}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color)}
                                    />
                                </div>
                                <div className="input2" >
                                    <InputBase className="get-in1"
                                        multiline
                                        placeholder="Take a note ...."
                                        id="description"
                                        value={key.description}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color)}
                                    />
                                </div>
                            </div>
                            <div>
                                {key.noteLabels.map(data => {
                                    // console.log("chip data.............", data.label);
                                    // console.log("notelabeles in gettallnotes", key.noteLabels);
                                    return (
                                        <Chip style={{ backgroundColor: "rgba(0,0,0,0.08)" }} className="chip" onDelete={() => this.handleDelete(data.id, key.id)}
                                            icon={<TagFacesIcon style={{ color: "black" }} />}
                                            label={data.label}>
                                        </Chip>
                                    );
                                })}
                            </div>
                            <div>
                                {key.reminder.map(data => {
                                    // console.log("chip data=>", data);
                                    // console.log("reminder in gettallnotes", key.reminder);
                                    return (
                                        <Chip style={{ backgroundColor: "rgba(0,0,0,0.08)" }} className="chip" onDelete={() => this.handleDeleteReminder(key.id)}
                                            icon={<AccessTimeIcon style={{ color: "black" }} />} label={data.slice(0, 21)}>
                                        </Chip>
                                    );
                                })}
                            </div>
                            <MuiThemeProvider theme={themes}>
                                <div className="gellAllNotes-icons" id="gellAllNote-icons" >
                                    <Tooltip title="Remind me">
                                        <AddAlertOutlinedIcon  
                                         reminderPropsToGetReminder={this.handleReminderInGetReminder}/>
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                                        <PersonAddOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                        <ColorPaletteComponent
                                            paletteProps={this.handleColor}
                                            notesId={key.id}
                                        />
                                    </Tooltip>
                                    <Tooltip title="add image">
                                        <ImageOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="Archive">
                                        <ArchiveComponent
                                            archiveNoteId={key.id} />
                                    </Tooltip>
                                    <Tooltip title="More">
                                        <MoreComponent
                                            noteID={key.id}
                                            deleteUpdate={this.deleteUpdate}
                                            labels={key.noteLabels}
                                            TrashPropsToGetNote={this.handleTrashInGetnote}
                                            createLabelPropsToGetNote={this.handleCreateLabel} />
                                    </Tooltip>
                                </div>
                            </MuiThemeProvider>
                        </Card>
                        <MuiThemeProvider theme={themes}>
                            <Dialog position="static"
                                open={this.state.open}
                            >
                                <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdate }}>
                                    <DialogTitle>
                                        Edit Notes
                                </DialogTitle>
                                    <DialogContent >
                                        <div className="input1">
                                            <InputBase className="get-in2"
                                                multiline
                                                placeholder="Title"
                                                id="title"
                                                value={this.state.title}
                                                onChange={this.handleUpdateTitle}
                                            />
                                        </div>
                                        <div className="input2">
                                            <InputBase className="get-in1"
                                                multiline
                                                placeholder="Take a note ...."
                                                id="description"
                                                value={this.state.description}
                                                onChange={this.handleUpdateDescription}
                                            />
                                        </div>
                                        <DialogActions>
                                            <div className="notes-icon-div2">
                                                <Tooltip title="Remind me">
                                                    <AddAlertOutlinedIcon />
                                                </Tooltip>
                                                <Tooltip title="collaborator">
                                                    <PersonAddOutlinedIcon />
                                                </Tooltip>
                                                <Tooltip title="Change color">
                                                    <ColorPaletteComponent
                                                        paletteProps={this.handleColor}
                                                        notesId={this.state.noteId}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Add image">
                                                    <ImageOutlinedIcon />
                                                </Tooltip>
                                                <Tooltip title="Archive">
                                                    <ArchiveOutlinedIcon
                                                        archiveNoteId={key.id} />
                                                </Tooltip>
                                                <Tooltip title="More">
                                                    <MoreVertOutlinedIcon
                                                        NoteId={key.id}
                                                        deleteUpdate={this.deleteUpdate} />
                                                </Tooltip>
                                                <Button
                                                    onClick={this.handleUpdate}>
                                                    close
                                        </Button>
                                            </div>
                                        </DialogActions>
                                    </DialogContent>
                                </Card>
                            </Dialog>
                        </MuiThemeProvider>
                    </div >
                )
            }
            return (null);
        })
        return (
            <div className={list}>
                {allReminder}
            </div>
        )
    }
}
export default withRouter(GetReminderComponent)