import React, { Component } from 'react'
import { Card, InputBase, Tooltip, Button, ClickAwayListener, Chip, Divider, Checkbox } from '@material-ui/core';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
// import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
// import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { addNotes } from '../services/userService';
import ColorPaletteComponent from './colorPaletteComponent';
import ReminderComponent from './reminderComponent';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom'
import CollaboratorComponent from './collaboratorComponent';
import MoreComponent from './moreComponent';
// import { withRouter } from 'react-router-dom'
// const theme = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             multiline: {
//                 padding: "0px 0 0px"
//             }
//         }, MuiPaper: {
//             rounded: {
//                 borderRadius: "10px"
//             }
//         }
//     }
// })
class CreateNotesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            takeNote: false,
            description: '',
            title: '',
            note: {},
            colorId: '',
            color: '',
            archive: false,
            rem: '',
            data: false,
            check: false,
            checkList:'',
            checkLists: [],
            truth: false,
            coll:'',
        }
    }
    handleClickAway = () => {
        this.setState({
            takeNote: false,
            check:false
        })
    }
    handleNotes = async () => {
        await this.setState({
            takeNote: !this.state.takeNote
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
            description: this.state.description,
            color: this.state.color,
            isArchived: this.state.archive,
            reminder: this.state.rem
        }
        // console.log("create notes data", data)
        addNotes(data).then((res) => {
            console.log(res);
            this.setState({
                note: res.data.status.details
            });
            this.props.getNew(this.state.note)
            this.setState({
                archive: false
            })
        }).catch((err) => {
            console.log(err);
        })


        this.setState({
            takeNote: false,
            title: '',
            description: '',
            color: '',
            rem: ''
        })
    }
    handleCloses=()=>{
        this.setState({
            check:false,
            takeNote: false,
            title: '',
            description: '',
            color: '',
            rem: ''
        })
    }
    handleColor = async (col) => {
        console.log('col', col);

        await this.setState({
            color: col
        })
        // console.log('create notes color', this.state.color);

    }
    handleArchive = async () => {

        await this.setState({
            archive: !this.state.archive

        })
        console.log('createnotes archive', this.state.archive);
    }
    // handleReminderInGetnote=(isRem)=>{

    //     if(isRem){
    //         this.getNotes()
    //     }
    // }
    handleRemValue = async (value) => {
        console.log("value in create note reminder", value);
        await this.setState({
            rem: value,
        })
    }
    handleCollValue=async(value)=>{
        console.log("value in create note handle coll value", value);
        await this.setState({
            coll: value,
        })
    }
    handleCheckList = () => {
        this.setState({
            check: !this.state.check
        })
    }
    handleCheck = (e) => {

        this.setState({
            checkList: e.target.value
        })
        console.log("check list---", this.state.checkList);
    }
    handleDone = () => {
        this.state.checkLists.push(this.state.checkList)
        this.setState({
            truth: true,
            checkList:''
        })
    }
    handleTrashInGetnote = (isTrash) => {
        if (isTrash) {
            this.getNotes()
        }
    }
    handleCreateLabel = (isLabel) => {
        if (isLabel) {
            this.getNotes()
        }
    }
    render() {
        return (
            <div className="createNotes-page" >
                {this.state.takeNote ? (
                    // <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Card className="createNotes-card2" style={{ backgroundColor: this.state.color }}>
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
                                <div className="createNotes-card2-takeNotes" >
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
                                <div>
                                    {

                                        (this.state.rem.length >= 0) ?
                                            null :
                                            <Chip
                                                //    icon={<AccessTimeIcon style={{ color: "black" }} />} 
                                                label={this.state.rem.toString().substr(0, 15)}
                                                size="medium"
                                            ></Chip>
                                    }
                                </div>
                                <div className="getAllNotes-colab-card" >
                                {this.state.coll.length>=0 ?
                                   null:
                                   
                            
                                     
                                        <Card style={{
                                            borderRadius: "50%", display: "flex", alignItems: "center",
                                            width: "40px", justifyContent: "center", boxShadow: "3px 3px 3px grey",
                                            height: "40px"
                                        }}
                                         
                                        >
                                            {this.state.coll.firstName.toUpperCase().charAt(0)}
                                        </Card>
                                 
                                
                            }
                            </div>
                            </div>

                            <div className="notes-icons">
                                <div className="notes-icon-div ">
                                    <Tooltip title="Remind me">
                                        <ReminderComponent
                                            notesId={""}
                                            // reminderPropsToGetNotes={this.handleReminderInGetnote}
                                            propsToCreateNote={this.handleRemValue}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                                        <CollaboratorComponent
                                        noteToCollab={""}
                                         propsToCreateNote={this.handleCollValue}/>
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                        <ColorPaletteComponent
                                            paletteProps={this.handleColor}
                                            notesId={""}
                                        />
                                    </Tooltip>
                                    <Tooltip title="add image">
                                        <ImageOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="Archive">
                                        <ArchiveOutlinedIcon
                                            onClick={this.handleArchive}
                                        />
                                    </Tooltip>
                                    <Tooltip title="More">
                                        {/* <TrashComponent
                                            trashNoteId={key.id} /> */}
                                        <MoreComponent
                                            noteID={""}
                                            title={""}
                                            description={""}
                                            questionAndAnswerNotes={""}
                                            labels={""}
                                            TrashPropsToGetNote={this.handleTrashInGetnote}
                                            createLabelPropsToGetNote={this.handleCreateLabel}
                                             />
                                    </Tooltip>
                                </div>
                                <Button style={{ paddingRight: "10px" }}
                                    onClick={this.handleClose}><b>
                                        Close</b>
                                </Button>
                            </div>
                        </Card>
                    //  </ClickAwayListener>
                )
                    : this.state.check ?
                        (
                            <ClickAwayListener onClickAway={this.handleClickAway}>
                            <Card className="createNotes-card2" style={{ backgroundColor: this.state.color }}>
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
                                {(this.state.truth === true) ?
                                    this.state.checkLists.map((key) => {
                                        console.log('checklist map key', key);
                                        return (
                                            <div className="createNotes-card2-checklist">
                                                {key}
                                                <CloseIcon />
                                            </div>
                                           
                                        )
                                    }) : (null)
                                }
                                <Divider />
                                <div className="createnotes-done">
                                    <div className="createNotes-card2-checklist">
                                        <InputBase className="createNotes-input"
                                            style={{ paddingLeft: "10px", paddingTop: "0px" }}
                                            type="text"
                                            fullWidth
                                            spellCheck={true}
                                            placeholder="+  List Item"
                                            value={this.state.checkValue}
                                            onChange={this.handleCheck}
                                        // onKeyPress={event => {
                                        //     if (event.key === 'Enter') {
                                        //         console.log('-psjps');

                                        //     }
                                        // }}
                                        >
                                        </InputBase>
                                        <div onClick={this.handleDone}><DoneIcon /></div>
                                    </div>
                                    {/* <div>{checklists}</div>  */}
                                </div>
                                <Divider />
                                <div className="notes-icons">
                                    <div className="notes-icon-div ">
                                        <Tooltip title="Remind me">
                                            <ReminderComponent
                                                notesId={""}
                                                // reminderPropsToGetNotes={this.handleReminderInGetnote}
                                                propsToCreateNote={this.handleRemValue}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Collaborator">
                                            <PersonAddOutlinedIcon />
                                        </Tooltip>
                                        <Tooltip title="Change color">
                                            <ColorPaletteComponent
                                                paletteProps={this.handleColor}
                                                notesId={""}
                                            />
                                        </Tooltip>
                                        <Tooltip title="add image">
                                            <ImageOutlinedIcon />
                                        </Tooltip>
                                        <Tooltip title="Archive">
                                            <ArchiveOutlinedIcon
                                                onClick={this.handleArchive}
                                            />
                                        </Tooltip>
                                        <Tooltip title="More">
                                            <MoreVertOutlinedIcon />
                                        </Tooltip>
                                    </div>
                                    <Button style={{ paddingRight: "10px" }}
                                        onClick={this.handleCloses}><b>
                                            Close</b>
                                    </Button>
                                </div>
                            </Card>
                            </ClickAwayListener>
                        ) :
                        (
                            // <MuiThemeProvider theme={theme}>
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
                                <div onClick={this.handleCheckList}> <CheckBoxOutlinedIcon fontSize="medium" /></div>
                            </Card>
                            // </MuiThemeProvider>
                        )}
                }


            </div>
            // )}

        )
    }

}
export default withRouter(CreateNotesComponent)