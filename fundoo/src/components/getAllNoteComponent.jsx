import React, { Component } from 'react'
import { getAllNotes, colorChange, updateNotes } from '../services/userService'
import { Card, InputBase, Tooltip } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Dialog, DialogTitle, Button, DialogActions, DialogContent } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import ArchiveComponent from './archiveComponent';
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
        MuiBackdrop:{
            root:{
                // backgroundColor: "transparent",
                backgroundColor:"rgba(11,11,11,0.06)"
        }
    },MuiPaper:{ 
        boxShadow:"none"
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
class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            open: false,
            noteId: '',
            title: '',
            description: '',
            colorUpdated: '',
            color: '',
            id:''
        }
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
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    handleColor = (col, noteid) => {
        var data = {
            noteIdList: [noteid],
            color: col
        }
        console.log('data in get', data);

        colorChange(data)
            .then((res) => {
                console.log('color change res', res);
                this.getNotes();
            }).catch((err) => {
                console.log(err);
            })
    }
    handleUpdateTitle=(e)=>{
        var title=e.target.value
        this.setState({
            title:title
        })
    }
    handleUpdateDescription=(e)=>{
        var description=e.target.value
        this.setState({
            description:description
        })
    }
    
    handleUpdate = (id, oldTitle, oldDescription) => {
        this.setState({
            noteId: id,
            title: oldTitle,
            description: oldDescription,
        })
        var data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description
        }
        console.log("data to be upadated",data);
        

        updateNotes(data)
            .then((res) => {
                this.getNotes();
                console.log('response in get notes (update)', res)
            })
            .catch((err) => {
                console.log('err in get all notes update is ', err);
            })
    }


    render() {
        const allNotes = this.state.notes.map((key) => {
            console.log('is archived',key.isArchived);
            if(key.isArchived===false){
                return (
              
                    <div className="get-contents">
                        
    
                        <Card className="get-card1" style={{ backgroundColor: key.color, boxShadow: " 5px 5px 5px gray" }}
                        >
                            <div style={{ paddingLeft: "20px", paddingTop: "20px" }} onClick={this.handleNoteClick}>
                                <div className="input1">
                                    <InputBase className="get-in2"
                                        multiline
                                        placeholder="Title"
                                        id="title"
                                        value={key.title}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description)}
                                    />
                                </div>
                                <div className="input2" >
                                    <InputBase className="get-in1"
                                        multiline
                                        placeholder="Take a note ...."
                                        id="description"
                                        value={key.description}
                                        onClick={() => this.handleUpdate(key.id, key.title, key.description)}
                                    />
                                </div>
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
                                        <MoreVertOutlinedIcon />
                                    </Tooltip>
                                </div>
                            </MuiThemeProvider>
                        </Card>
                       <MuiThemeProvider theme={themes}>
                        <Dialog position="static"
                            onClose={this.handleClose}
                            open={this.state.open}
                            // aria-labelledby="alert-dialog-title"
                            // aria-describedby="alert-dialog-description"
                        >
                            <Card className="get-card2" style={{ backgroundColor:this.state.colorUpdated  }}>
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
                                                    notesId={this.state.noteId} />
                                            </Tooltip>
                                            <Tooltip title="Add image">
                                                <ImageOutlinedIcon />
                                            </Tooltip>
                                            <Tooltip title="Archive">
                                                <ArchiveOutlinedIcon 
                                               archiveNoteId={key.id} />
                                            </Tooltip>
                                            <Tooltip title="More">
                                                <MoreVertOutlinedIcon />
                                            </Tooltip>
                                            <Button
                                                onClick={() => this.handleUpdate(this.state.noteId, this.state.title, this.state.description, this.state.color)}>
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
            return(null);
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}
export default GetAllNoteComponent