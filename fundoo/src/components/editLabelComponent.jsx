import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { withRouter } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Divider from '@material-ui/core/Divider';
import { getLabels, label,deleteNoteLabel,editNoteLabel } from '../services/userService';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import AddIcon from '@material-ui/icons/Add';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { Card, InputBase, Button, MenuItem,DeleteIcon } from '@material-ui/core';
// const theme = createMuiTheme({
//     overrides: {
//         MuiDrawer: {
//             paperAnchorLeft: {
//                 width: 250,
//                 top: 65,
//                 background: 'white'
//             },
//             paperAnchorDockedLeft: {
//                 borderColor: "white"
//             }
//         }
//     }
// })
class EditeLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            title: '',
            allLabels: [],
            opens: false,
            mouse: false,
            trueIcon: false,
            labelName: '',
            labelId: '',
            input: false,
        }
    }
    async componentDidMount() {
        await getLabels()
            .then(res => {
                console.log('get labels', res);
                this.setState({
                    allLabels: res.data.data.details
                })
                console.log('get alllabels in editLabel', this.state.allLabels);
            })
            .catch((err) => {
                console.log('err in get labels in edit label', err);
            })
    }
    handleRemove = () => {
        this.setState({
            open: false
        })
    }
    handleUpdateTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }
    handleClear = () => {
        this.setState({
            title: ''
        })
    }
    handleDone = () => {
        // console.log("labels are ", this.state.labels[0].length);
        // for (let i = 0; i < this.state.allLabels.length; i++) {
        //     for (let j = 0; j < 4; j++) {
        //         console.log("lbaels", this.state.labels[i].label);

        //     }
        // }
        var data = {
            "label": this.state.title,
            "isDeleted": false,
            "userId": localStorage.getItem('userId')
        }

        label(data).then((res) => {
            console.log('res after hitting api label in edit label', res.data);
            this.setState({
                title: ''
            })
            this.getLabels();
        }).catch((err) => {
            console.log('err in hitting api label in edit label', err);
        })
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false

        })
    }
    handleSub = () => {
        this.setState({
            opens: true

        })
    }
    handleMouseOut = async (labelName) => {
        await this.setState({
            mouse: false,
            labelName: labelName
        })
    }
    handleMouseOver = async (labelName) => {
        console.log("label name is ", labelName);
        await this.setState({
            mouse: true,
            labelName: labelName
        })
    }
    handleLabel = async (labelName, labelId) => {
        // console.log("label name is ", labelName);
        // console.log("label id is ", labelId);
        await this.setState({
            input: true,
            labelName: labelName,
            mouse: true,
            trueIcon: true,
            labelId: labelId
        })
    }
    handleDoneLables = async () => {
        var data = {
            "label": this.state.labelName,
            "labelId": this.state.labelId
        }
        await this.setState({
            input: false,
            mouse: false,
            trueIcon: false,
        })
        editNoteLabel(data).then((res) => {
            console.log("Response after hitting updatenoteslabel", res);
            this.getLabels();
        }).catch((err) => {
            console.log("error in hitting update notes label", err);
        })
    }
    handleDeleteLabel = (labelId) => {
        console.log("labelid is ", labelId);
        var data = {
            "labelId": labelId
        }
        deleteNoteLabel(data).then((res) => {
            console.log("res after hitting api", res);
            this.getLabels();
        }).catch((err) => {
            console.log("error in hitting delete notes label", err);
        })
    }
    handleLabelChange = async (e) => {
        await this.setState({
            labelName: e.target.value
        })
    }
    render() {
        var labelMap = this.state.allLabels.map((key) => {
            // console.log('map keyin edit label',this.state.labelId)
            // console.log("label id is ", this.state.labelId);
            // console.log("key id is ", key.id);
            // console.log("label key---- ", key.label);
            return (
                // <div>
                // <span id="note" className="edit-label-div">
                //     <LabelIcon style={{ paddingRight: "15%", color: "grey" }} />
                //     {key.label}
                //     <Tippy content={<span>Edit Label</span>}>
                //         <EditIcon style={{ color: "grey" }} />
                //     </Tippy>

                // </span>
                // className="label1-map"
                 <div  className="edit-label-div">
                    {/* {this.state.trueIcon && key.id === this.state.labelId ? <DeleteIcon
                        onClick={() => this.handleDeleteLabel(key.id)} /> : */}
                        {console.log('----',key.label)}
                        {this.state.mouse && key.label === this.state.labelName ?
                            <DeleteIcon
                                onMouseOut={() => this.handleMouseOut(key.label)}
                                onClick={() => this.handleDeleteLabel(key.id)} /> :
                                
                            < LabelIcon style={{ paddingRight: "15%", color: "grey" }}
                                onClick={() => this.handleMouseOver(key.label)}
                            />
                     }
                   {this.state.input && key.id === this.state.labelId ?
                        <InputBase
                            id="title"
                            value={this.state.labelName}
                            onChange={this.handleLabelChange}
                        />
                        :
                        <InputBase
                            id="title"
                            value={key.label}
                            onClick={() => this.handleLabel(key.label, key.id)}
                        />
                    }
                    {this.state.trueIcon && key.id === this.state.labelId ?
                        <DoneOutlinedIcon onClick={this.handleDoneLables} /> :
                        <Tippy content={<span>Edit Label</span>}>
                         <EditIcon style={{ color: "grey" }} />
                    </Tippy>
                    }
                </div> 
                // </div> 
            )
        })
        return (
            <div>
                <MenuItem id="note" onClick={this.handleEdit} >
                    <EditOutlinedIcon />
                    <span className="drawer-names"> EditLabels</span>
                </MenuItem>
                <div>

                    {/* <MuiThemeProvider theme={theme}> */}
                    <Dialog position="static"
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                    >

                        <Card className="edit-label-card">
                            <DialogTitle>
                                Edit labels
                            </DialogTitle>
                            <DialogContent>
                                {!this.state.opens ?
                                    <div className="edit-label-input" onClick={this.handleSub}>
                                        <div>
                                            <AddIcon style={{ color: "grey" }} />
                                        </div>
                                        <div>
                                            <InputBase className="get-in2"
                                                placeholder="Create new label"
                                                id="title"
                                                value={this.state.title}
                                                onChange={this.handleUpdateTitle}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className="edit-label-input">
                                        <div>
                                            <DoneOutlinedIcon onClick={this.handleDone} style={{ color: "grey" }} />
                                        </div>
                                        <div>
                                            <InputBase className="get-in2"
                                                placeholder="Create new label"
                                                id="title"
                                                value={this.state.title}
                                                onChange={this.handleUpdateTitle}
                                            />
                                        </div>
                                        <div>
                                            <ClearOutlinedIcon onClick={this.handleClear} style={{ color: "grey" }} />
                                        </div>

                                    </div>
                                }
                                <div className="edit-label-labelmap">
                                    {labelMap}
                                </div>
                                {/* <div className="edit-map">{labelMap}</div> */}

                                <Divider />
                                <div id="edit-button">
                                    <Button onClick={this.handleDone}>Done</Button>
                                </div>
                            </DialogContent>
                        </Card>
                    </Dialog>
                    {/* </MuiThemeProvider> */}
                </div>
            </div>
        )
    }
}

export default withRouter(EditeLabelComponent)