import React, { Component } from 'react'
import { colorChange, updateNotes, deleteLabels, deleteReminder, getArchive, getAllNotes,archive } from '../services/userService'
import { Card, InputBase, Tooltip, Chip } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import UnarchiveComponent from './unarchiveComponent';
import MoreComponent from './moreComponent';
import ReminderComponent from './reminderComponent';
import { withRouter } from 'react-router-dom'
import CollaboratorComponent from './collaboratorComponent';
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
class GetTrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archive: [],
            notes: [],
            open: false,
            noteId: '',
            title: '',
            description: '',
            colorUpdated: '',
            colorUpdate: '',
            color: '',
            id: '',
            trashId: '',
            isArchived:false
        }
    }
    componentDidMount() {

        this.getAllArchive();
        this.getNotes();
    }
    handleDelete = (labelId, noteIdToLabel) => {
        var data = {
            "labelId": labelId,
            "noteId": noteIdToLabel
        }
        deleteLabels(data, noteIdToLabel, labelId)
            .then((response) => {
                console.log("response in getReminder comp deleteLabel", response);
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
                console.log("response in getArchive delete reminder", response);
                this.getRem();
            }).catch((err) => {
                console.log("error in getArchive  delete reminder", err);
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
    getAllArchive = () => {
        getArchive().then((res) => {
            console.log('response in getArchive--', res);
            this.setState({
                archive: res.data.data.data
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
                console.log('color change res', res);
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
    handleArchiveInGetArchive=(isArchive)=>{
        console.log('55555----',isArchive);
        
        if (isArchive===true) {
           this.getNotes()
        }
    }
    render() {
        const list = this.props.list ? "container1" : "container";
        const list1 = this.props.list ? "get-contents1" : "get-contents"
        const list2 = this.props.list ? "get-card2" : "get-card1"
var num=0;
        const allArchive = this.state.archive.filter(titleDescSearch(this.props.searchText)).map((key) => {
            // console.log('getArchive comp map key---',key);
            // console.log('getArchive comp allArchive---',allArchive);
            if (key.isArchived === true && key.isDeleted === false) {
                num=num+1
            return (
                // (key.isDeleted === false) &&(key.isArchived===true)&&
                <div className={list1}>
                    <Card className={list2} style={{ backgroundColor: key.color, boxShadow: " 5px 5px 5px gray",
                    //   transform: (!this.props.menu) ?   "translate(80px,0)":(null),
                    //   transition: (!this.props.menu) ? ("0.5s") : ("0.5s"), 
                    }}>
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
                        {/* <div>
                            {key.noteLabels.map(data => {
                                console.log("chip data.............", data.label);
                                console.log("notelabeles in gettallnotes", key.noteLabels);
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
                                console.log("chip data=>", data);
                                console.log("reminder in gettallnotes", key.reminder);
                                return (
                                    <Chip style={{ backgroundColor: "rgba(0,0,0,0.08)" }} className="chip" onDelete={() => this.handleDeleteReminder(key.id)}
                                        icon={<AccessTimeIcon style={{ color: "black" }} />} label={data.slice(0, 21)}>
                                    </Chip>
                                );
                            })}
                        </div> */}
                        <MuiThemeProvider theme={themes}>
                            <div className="gellAllNotes-icons" id="gellAllNote-icons" >
                                <Tooltip title="Remind me">
                                <ReminderComponent
                                        notesId={key.id}  
                                         reminderPropsToGetReminder={this.handleReminderInGetReminder}/>
                                </Tooltip>
                                <Tooltip title="Collaborator">
                                <CollaboratorComponent noteToCollab={key.id}
                                            addCollab={this.handleColab}
                                            remCollab={this.handleColab} />
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
                                {/* <Tooltip title="Archive">
                                        <ArchiveComponent 
                                            archiveNoteId={key.id} />
                                    </Tooltip> */}
                                    <Tooltip title="Archive">
                                        <UnarchiveComponent
                                            archiveNoteId={key.id} 
                                            archivePropsToGetArchive={this.handleArchiveInGetArchive}/>
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
        })
        return (
            <div className={list}>
                {allArchive}
                {num===0?
                <img style={{ marginLeft: "13%" }} alt="" src={require('../assets/images/oops.png')}></img>
                :null
                    }
            </div>
        )
    }
}
export default withRouter(GetTrashComponent)