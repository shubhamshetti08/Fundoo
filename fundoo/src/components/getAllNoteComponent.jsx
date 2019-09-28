import React, { Component } from 'react'
import { getAllNotes, colorChange, updateNotes, deleteLabels } from '../services/userService'
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
// import TrashComponent from './trashComponent';
import MoreComponent from './moreComponent';
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
            colorUpdate:'',
            color: '',
            id: '',
            trashId:''
        }
    }  
     componentDidMount() {
        this.getNotes();
    }
    handleDelete=(labelId,noteIdToLabel)=>{
        var data = {
            "labelId": labelId,
           "noteId":noteIdToLabel
        }
        deleteLabels(data,noteIdToLabel,labelId)
        // this.props.noteIdToLabel
            .then((response) => {
                console.log("response in note label", response);
            }).catch((err)=>{
                console.log("error in note label", err);
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
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
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
            colorUpdate:col
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

    handleUpdate = (id, oldTitle, oldDescription,colorUpdate) => {
        console.log('=====',id)
        this.setState({
            open:!this.state.open,
            noteId: id,
            title: oldTitle,
            description: oldDescription,
            colorUpdate:colorUpdate,
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
deleteUpdate=(trashNoteId)=>{
    // this.setState({
    //    trashId: trashNoteId
    // })
        console.log("note in deleteUp", this.state.notes);
        var delId = trashNoteId;
        var newArr = this.state.notes;
        console.log("trashnotes id is ", delId);
        console.log("new array is ", newArr);
        for (let i = 0; i < newArr.length; i++) {
            console.log("yes entered");
            if (newArr[i].id === delId) {
                console.log("yes ", delId);
                newArr[i].isDeleted = true;
                newArr[i].isArchived = false;
                newArr[i].isPinned = false;
            }
        }
        this.setState({
            notes: newArr
        })
        this.setState({
            trashId: trashNoteId,
            open: !this.state.open
        })
    }


    render() {
        const allNotes = this.state.notes.filter(titleDescSearch(this.props.searchText)).map((key) => {
            //  console.log('is archived',JSON.stringify(key.label));
            // console.log('is archived', key.isDeleted);
            if (key.isArchived === false && key.isDeleted === false) {
                return (

                    <div className="get-contents">


                        <Card className="get-card1" style={{ backgroundColor: key.color, boxShadow: " 5px 5px 5px gray" }}
                        >
                            <div style={{ paddingLeft: "20px", paddingTop: "20px" }} >
                                <div className="input1">
                                    <InputBase className="get-in2"
                                        multiline
                                        placeholder="Title"
                                        id="title"
                                        value={key.title}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description,key.color)}
                                    />
                                </div>
                                <div className="input2" >
                                    <InputBase className="get-in1"
                                        multiline
                                        placeholder="Take a note ...."
                                        id="description"
                                        value={key.description}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description,key.color)}
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
                                        console.log("chip data.............", data.label);
                                        return (
                                            <Chip onDelete={()=>this.handleDelete(data.id,key.id)}
                                            label={data.label}>
                                             
                                            </Chip>
                                        );
                                    })}
                                {/* </Paper> */}
                                </div>

                            <MuiThemeProvider theme={themes}>
                                <div className="gellAllNotes-icons" id="gellAllNote-icons" >
                                    <Tooltip title="Remind me">
                                        < AddAlertOutlinedIcon />
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
                                            // {this.getNotes}
                                            archiveNoteId={key.id} />
                                    </Tooltip>
                                    <Tooltip title="More">
                                        {/* <TrashComponent
                                            trashNoteId={key.id} /> */}
                                        <MoreComponent
                                            noteID={key.id}
                                            deleteUpdate={this.deleteUpdate} />

                                    </Tooltip>
                                </div>
                            </MuiThemeProvider>
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
                )
            }
            return (null);
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}
