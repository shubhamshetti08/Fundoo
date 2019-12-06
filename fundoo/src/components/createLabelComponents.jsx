import React, { Component } from 'react';
import { Tooltip, TextField, Popper, Paper, Checkbox, Menu } from '@material-ui/core';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { getLabels, getAllNotes, noteLabels, createlabel } from '../services/userService';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
export default class CreateLabelComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poper: false,
            isDeleted: false,
            anchorEl: null,
            cardOpen: false,
            check: false,
            label: [],
            create: false,
            labelText: '',
            allLabels: [],
            createdLabel: [],
            hi: this.props.hi,
        }
    }
    componentDidMount() {
        this.getLabel()
    }
    handleLabelText = (e) => {
        console.log('value---', e.target.value);

        this.setState({
            labelText: e.target.value
        })
    }
    handleKeyDown = () => {
        this.setState({
            create: true
        })
    }
    handleAddLabel = (event) => {
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : this.props.propsToCreateLabel,

        })
        this.props.createLabelToMore(true)
        console.log("creayret mnmkjkj", this.state.anchorEl, this.state.poper);

    }

    getLabel = () => {
        getLabels()
            .then(res => {
                console.log('get labelss', res);
                this.setState({
                    allLabels: res.data.data.details
                })
                console.log('get alllabels', this.state.allLabels);
            })
            .catch((err) => {
                console.log('err in get labels', err);
            })
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            console.log('response is', res);
            // this.setState({
            //     notes: res.data.data.data
            // })
        })
    }
    handleLabel = () => {
        var userId = localStorage.getItem('userId')
        console.log('user idddddddddd', userId)
        var data = {
            "label": this.state.labelText,
            "isDeleted": false,
            "userId": userId
        }
        createlabel(this.props.noteIdToLabel, data).then((res) => {
            console.log('res after hitting api label', res);
            this.setState({
                createdLabel: res.data.label
            })
            console.log('created label in createlabelcomp', this.state.createdLabel);

            this.getNotes();
            this.getLabel();

        }).catch((err) => {
            console.log('err in create label', err);
        })
    }
    handleCheck = (labelId) => {
        this.setState({
            check: !this.state.check,
            anchorEl: false
        })
        console.log("jdkfkdj", this.props.noteIdToLabel);
        var data = {
            "labelId": labelId,
            "noteId": this.props.noteIdToLabel
        }
        console.log("data in create labelcomp", data);
        noteLabels(data)
            // this.props.noteIdToLabel
            .then((response) => {
                console.log("response in note label", response);
                this.props.createLabelPropsToMore(true)
            }).catch((err) => {
                console.log("error in note label", err);
            })
        // console.log('000000',this.state.check);

        if (this.state.check === false) {
            this.props.createLabelToMore(true)
        }
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    render() {
        const labelMap = this.state.allLabels.map((key) => {
            // console.log('create key', JSON.stringify(key.id));
            // console.log('create key----',this.state.allLabels);
            return (
                <div >
                    <Checkbox defaultChecked={this.props.noteLabels.map(ele => ele.label).includes(key.label)}
                        onChange={() => this.handleCheck(key.id)}
                    />

                    {key.label}

                </div>
            )
        })
        return (
            <div>
                {/* <div  onClick={event => this.setState({
                        poper: true,
                        anchorEl: event.currentTarget
                    })} > */}
                <div onClick={(event) => this.handleAddLabel(event)}>
                    <LabelOutlinedIcon />
                    Add Label
                        </div>
                {/* <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} onKeyDown={this.handleKeyDown}> */}
                <Menu open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "99999" }}
                    onKeyDown={this.handleKeyDown} onClose={this.handleClose}>

                    <Paper className="label-popper">
                        <div>
                            <p>Label Note</p>
                            {/* <InputBase className="get-in2" */}
                            <TextField
                                type="search"
                                // id="standard-bare"
                                // margin="normal"
                                fullWidth
                                placeholder="Enter label name"
                                value={this.state.title}
                                onChange={this.handleLabelText}
                            />
                            <Tooltip title="search">
                                <SearchOutlinedIcon />
                            </Tooltip>
                            <div className="trash-checkbox">{labelMap}</div>
                            <div style={{ cursor: "pointer" }}>{this.state.create ?
                                (<p onClick={this.handleLabel}>+ create {this.state.labelText}</p>)
                                : (null)}</div>
                        </div>
                    </Paper>
                </Menu>
                {/* </Popper> */}
            </div>

        )
    }
}
