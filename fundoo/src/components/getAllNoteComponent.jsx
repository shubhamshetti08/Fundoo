import React, { Component } from 'react'
import { getAllNotes, colorChange, updateNotes, deleteLabels, deleteReminder } from '../services/userService'
import { Card, InputBase, Tooltip, Chip, Divider } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import ArchiveComponent from './archiveComponent';
// import TrashComponent from './trashComponent';
import MoreComponent from './moreComponent';
import ReminderComponent from './reminderComponent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import CollaboratorComponent from "../components/collaboratorComponent"
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide';

// const themes = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             multiline: {
//                 padding: "1px 20px 22px"
//             }
//         }, MuiPaper: {
//             rounded: {
//                 borderRadius: "10px"
//             }
//         }
//     }
// })
const themes = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                fontSize: "1.2rem"
            }
        },
        MuiBackdrop: {
            root: {
                // backgroundColor: "transparent",
                backgroundColor: "rgba(11,11,11,0.06)"
            }
        }, MuiPaper: {
            elevation24: {
                boxShadow: "none"
            }
        }
    }
})
// const styles = createMuiTheme({
// MuiBackdrop:{
//     root:{
//         // backgroundColor:"transparent",
//         // webkitTapHighlightColor:"transparent"
//         backgroundColor:"rgba(11,11,11,0.18)",
//     }
// },MuiPaper:{ 
//         boxShadow:"none"
// }
// })
function titleDescSearch(searchText) {
    return function (val) {
        return val.title.includes(searchText) || val.description.includes(searchText)
    }
}
export default class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
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
        this.getNotes();
    }
    handleDelete = (labelId, noteIdToLabel) => {
        var data = {
            "labelId": labelId,
            "noteId": noteIdToLabel
        }
        deleteLabels(data, noteIdToLabel, labelId)
            // this.props.noteIdToLabel
            .then((response) => {
                // console.log("response in note label", response);
                this.getNotes();
            }).catch((err) => {
                console.log("error in note label", err);
            })
    }
    handleDeleteReminder = (noteId) => {
        var data = {
            noteIdList: [noteId]
        }
        deleteReminder(data)
            // this.props.noteIdToLabel
            .then((response) => {
                // console.log("response in get all notes delete reminder", response);
                this.getNotes();
            }).catch((err) => {
                console.log("error in get all notes delete reminder", err);
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

    getNotes = () => {
        getAllNotes().then((res) => {
            // console.log('response after getnote', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    updatedCard = (card) => {
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
                // console.log('response in get notes (update)', res)
            })
            .catch((err) => {
                console.log('err in get all notes update is ', err);
            })
    }
    deleteUpdate = (trashNoteId) => {
        // this.setState({
        //    trashId: trashNoteId
        // })
        // console.log("note in deleteUpdate-----", this.state.notes);
        // var delId = trashNoteId;
        // var newArr = this.state.notes;
        // console.log("trashnotes id is ", delId);
        // console.log("new array is ", newArr);
        // for (let i = 0; i < newArr.length; i++) {
        //     console.log("yes entered");
        //     if (newArr[i].id === delId) {
        //         console.log("yes ", delId);
        //         newArr[i].isDeleted = true;
        //         newArr[i].isArchived = false;
        //         newArr[i].isPinned = false;
        //     }
        // }
        // this.setState({
        //     notes: newArr
        // })
        // this.setState({
        //     trashId: trashNoteId,
        //     // open: !this.state.open
        // })
    }
    handleTrashInGetnote = (isTrash) => {
        if (isTrash) {
            this.getNotes()
        }
    }
    handleReminderInGetnote = (isRem) => {
        if (isRem) {
            this.getNotes()
        }
    }
    handleCreateLabel = (isLabel) => {
        if (isLabel) {
            this.getNotes()
        }
    }
    handleArchiveInGetnote = (isArchive) => {
        if (isArchive) {
            this.getNotes()
        }
    }
    handleColab = (isColab) => {
        if (isColab) {
            this.getNotes()
        }
    }
    render() {
        const list = this.props.list ? "container1" : "container";
        const list1 = this.props.list ? "get-contents1" : "get-contents"
        const list2 = this.props.list ? "get-card2" : "get-card1"
// var num=0;
        const allNotes = this.state.notes.filter(titleDescSearch(this.props.searchText)).map((key) => {
            //  console.log('is archived',JSON.stringify(key.label));
            console.log('is archived', key.title);
            if (key.isArchived === false && key.isDeleted === false) {
                // num=num+1;
                return (

                    //  <div className="get-contents">
                    // <Draggable>
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
                                {/* <Paper style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 2px 1px -1px rgba(0, 0, 0, 0)"
                                }}
                                > */}

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
                                {/* </Paper> */}
                            </div>
                            <div>
                                {key.reminder.map(data => {
                                    // console.log("chip data=>", data);
                                    // console.log("reminder in gettallnotes", key.reminder);



                                    return ((data.length > 0) &&
                                        <Chip style={{ backgroundColor: "rgba(0,0,0,0.08)" }} className="chip"
                                            onDelete={() => this.handleDeleteReminder(key.id)}
                                            icon={<AccessTimeIcon style={{ color: "black" }} />} label={data.slice(0, 21)}>

                                        </Chip>)

                                })}
                            </div>
                            <div className="getAllNotes-colab-card" >
                                {key.collaborators.map(data => {
                                    console.log("getnotes-colab-----data", data);
                                    // console.log("notelabeles in gettallnotes", key.noteLabels);
                                    return (
                                        <Card style={{
                                            borderRadius: "50%", display: "flex", alignItems: "center",
                                            width: "40px", justifyContent: "center", boxShadow: "3px 3px 3px grey",
                                            height: "40px"
                                        }} onDelete={() => this.handleDelete(data.id, key.id)}
                                            icon={<TagFacesIcon style={{ color: "black" }} />}
                                        >
                                            {data.firstName.toUpperCase().charAt(0)}
                                        </Card>
                                    );
                                })}
                            </div>

                            <MuiThemeProvider theme={themes}>
                                <div className="gellAllNotes-icons" id="gellAllNote-icons" >
                                    <Tooltip title="Remind me">
                                        < ReminderComponent notesId={key.id}
                                            reminderPropsToGetNotes={this.handleReminderInGetnote} />
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                                        <CollaboratorComponent noteToCollab={key.id}
                                            addCollab={this.handleColab}
                                            remCollab={this.handleColab} />
                                        {/* <PersonAddOutlinedIcon /> */}
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
                                            // {this.getNotes}
                                            archiveNoteId={key.id}
                                            archivePropsToGetNotes={this.handleArchiveInGetnote} />
                                    </Tooltip>
                                    <Tooltip title="More">
                                        {/* <TrashComponent
                                            trashNoteId={key.id} /> */}
                                        <MoreComponent
                                            noteID={key.id}
                                            title={key.title}
                                            description={key.description}
                                            questionAndAnswerNotes={key.questionAndAnswerNotes}
                                            deleteUpdate={this.deleteUpdate}
                                            labels={key.noteLabels}
                                            TrashPropsToGetNote={this.handleTrashInGetnote}
                                            createLabelPropsToGetNote={this.handleCreateLabel} />
                                    </Tooltip>
                                </div>
                            </MuiThemeProvider>
                            <Divider />
                            <div>
                                {key.questionAndAnswerNotes.map(data => {
                                    // console.log("chip data=>", data);
                                    console.log("33333333", data.message);



                                    return (
                                        <div style={{padding:"5%"}}>
                                            <span style={{color:"blue"}} >asked question</span>
                                            <p>{data.message}</p>
                                        </div>
                                    )


                                })}
                            </div>
                        </Card>
                        <MuiThemeProvider theme={themes}>
                            <Dialog position="static"
                                // onClose={this.handleClose}
                                open={this.state.open}
                            // aria-labelledby="alert-dialog-title"
                            // aria-describedby="alert-dialog-description"
                            >
                                <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdate }}>
                                    {/* this.state.colorUpdated */}
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
                                                    // notesId={key.id} 
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Add image">
                                                    <ImageOutlinedIcon />
                                                </Tooltip>
                                                <Tooltip title="Archive">
                                                    <ArchiveOutlinedIcon
                                                        // getAllNotes={this.props.id}
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
                    // </Draggable>
                )
            }
            return (null);
        })
        return (
            // <Slide direction="right"  mountOnEnter unmountOnExit>
            <div className={list}>
                {/* <div>{num}</div> */}
                {allNotes}
            </div>
            // </Slide>
        )
    }
}
