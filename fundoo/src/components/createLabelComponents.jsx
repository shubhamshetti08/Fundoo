import React, { Component } from 'react';
import { Tooltip, InputBase, Popper, Paper,Checkbox } from '@material-ui/core';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { getLabels, getAllNotes, noteLabels,label } from '../services/userService';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
export default class CreateLabelComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poper: false,
            isDeleted: false,
            anchorEl: false,
            cardOpen: false,
            check:false,
            label: [],
            create: false,
            labelText: '',
            allLabels: [],
            createdLabel: []
        }
    }
    componentDidMount() {
        this.getLabel()
    }
    handleLabelText = (e) => {
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
           
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : event.target
        })
        console.log("creayret mnmkjkj", this.state.anchorEl, this.state.poper);

    }
   
    getLabel = () => {
        getLabels()
            .then(res => {
                console.log('get labels', res);
                this.setState({
                    allLabels: res.data.data.details
                })
                console.log('get alllabels',this.state.allLabels);
            })
            .catch((err) => {
                console.log('err in get labels', err);
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
    handleLabel = () => {
        var userId = localStorage.getItem('userId')
        console.log('user idddddddddd', userId)
        var data = {
            "label": this.state.labelText,
            "isDeleted": false,
            "userId": userId
        }
        label(this.props.noteIdToLabel,data).then((res) => {
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
           check:!this.state.check
        })
        console.log("jdkfkdj",this.props.noteIdToLabel);
        var data = {
            "labelId": labelId,
           "noteId":this.props.noteIdToLabel
        }
        
        console.log("data in create labelcomp", data);
        noteLabels(data)
        // this.props.noteIdToLabel
            .then((response) => {
                console.log("response in note label", response);
            }).catch((err)=>{
                console.log("error in note label", err);
            })
    }
    // renderAllLabel=()=>{
    //     return(<div>
    //         {this.state.allLabels.map((key)=>
    //             <List>
    //                 <Checkbox
    //                 value={key.label}
    //                 onClick={(e.CheckedNotes(e.key.id))}
    //                 ></Checkbox>
    //                 {key.label}
    //             </List>
    //         )
    //         }
    //     </div>)
    // }
    render() {
        const labelMap = this.state.allLabels.map((key) => {
            console.log('create key',JSON.stringify(key.id));

            return (
                <div >
                    <Checkbox checked={this.state.check}
                        onChange={()=>this.handleCheck(key.id)}
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

                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} onKeyDown={this.handleKeyDown}>
                    <Paper className="label-popper">
                        <div>
                            <p>Label Note</p>
                            <InputBase className="get-in2"
                                placeholder="Enter label name"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleLabelText}
                            />
                            <Tooltip title="search">
                                <SearchOutlinedIcon />
                            </Tooltip>
                            <div className="trash-checkbox">{labelMap}</div>
                            {this.state.create ? (<p onClick={this.handleLabel}>+ create {this.state.labelText}</p>) : (null)}
                        </div>
                    </Paper>
                </Popper>
            </div>

        )
    }
}
