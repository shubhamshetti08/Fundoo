import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'; import { withRouter } from 'react-router-dom';
import { getLabels } from '../services/userService';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EditeLabelComponent from "../components/editLabelComponent"
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import ReminderComponent from './reminderComponent';

// import { yellow } from '@material-ui/core/colors';
// import { width } from '@material-ui/system';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top:"69px"
            },
            paperAnchorLeft: {
                width:"230px"
            }
        },
        MuiButtonBase: {
            root: {
                borderRadius: "0px 30px 30px 0px"
            }
        }
    }
})

class DrawerComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            open2: false,
            open3: false,
            color: null,
            appTitle: '',
            allLabels: [],
           pointer:'Notes',
        }
    }
    componentDidMount() {
        this.getLabel()
        
    }
    handleColor = () => {
        this.setState({
            // open1: false,
            // open2: false,
            // open3: false,
            // open4: false,
            // open: !this.state.open,
            // color: "#FEEFC3"
            pointer:'Notes',
        })
        this.props.history.push('/dashboard');
    }
    handleColor1 = async () => {
        await this.setState({
            // open1: !this.state.open1,
            // open: false,
            // open2: false,
            // open3: false,
            // open4: false,
            // color: "#FEEFC3",
            pointer:'Reminder',
            appTitle: "Reminder"
        })
        this.props.history.push('/reminder', this.state.appTitle);
    }
    handleColor2 = () => {
        this.setState({
            // open2: !this.state.open2,
            // open: false,
            // open1: false,
            // open3: false,
            // open4: false,
            pointer:'EditLabel',
            color: "#FEEFC3"
        })
    }
    handleColor3 = async () => {
        await this.setState({
            // open3: !this.state.open3,
            // open: false,
            // open1: false,
            // open2: false,
            // open4: false,
            // color: "#FEEFC3",
            appTitle: "Archive"
        })
        this.props.history.push('/archive', this.state.appTitle);
        console.log('title----', this.state.appTitle);

    }
    handleColor4 = async () => {
        await this.setState({
            // open4: !this.state.open4,
            // open: false,
            // open1: false,
            // open2: false,
            // open3: false,
            // color: "#FEEFC3",
            appTitle: "Trash"
        })
        this.props.history.push('/trash', this.state.appTitle);
    }

    getLabel = () => {
        getLabels()
            .then(res => {
                console.log('get labels', res);
                this.setState({
                    allLabels: res.data.data.details
                })
                // this.getLabel()
                console.log('get alllabels', this.state.allLabels);
            })
            .catch((err) => {
                console.log('err in get labels', err);
            })
    }
    handleChild=async(labelName)=>{
        //console.log("in lallaallalalallala",labelName)
        await this.setState({
        appTitle: labelName
        })
        this.props.history.push(`/labels/${labelName}`,this.state.appTitle)
        }
    render() {
        var temp1 = this.state.open ? this.state.color : null
        var temp2 = this.state.open1 ? this.state.color : null
        var temp3 = this.state.open2 ? this.state.color : null
        var temp4 = this.state.open3 ? this.state.color : null
        var temp5 = this.state.open4 ? this.state.color : null
        const labelMap = this.state.allLabels.map((key) => {
            // console.log('create key', JSON.stringify(key.id));
            // console.log('create key----',this.props.noteLabels);
            return (
                <div className="drawer-label" onClick={()=>this.handleChild(key.label)} >
                    <LabelOutlinedIcon style={{paddingRight:"30px"}} />
                    {key.label}

                </div>
            )
        })
        // style={{ backgroundColor:this.state.pointer==='Reminder'?'red':'blue'}}
        return (
            <div className="drawer-container" >
                <MuiThemeProvider theme={theme} >
                    <div className="drawer-div1" style={{ borderRadius: "0px 50px 50px 0px" }}>
                        <Drawer variant="persistent" overflow="auto" open={this.props.menuSelect}  >
                            <MenuItem id="notes" className="drawer-data" onClick={this.handleColor} >
                                <EmojiObjectsOutlinedIcon />
                                <span className="drawer-names">Notes</span>
                            </MenuItem>
                            <MenuItem id="notification"className="drawer-data" onClick={this.handleColor1} >
                                <ReminderComponent />
                                <span className="drawer-names">Reminders</span>
                            </MenuItem>
                            <Divider />
                            <div  style={{overflowY:"auto",height:"53%"}} >
                                <h6 style={{ paddingLeft: "20px" }}>LABLES</h6>
                                <div className="drawer-labels">{labelMap}</div>
                                <span id="editlabel"className="drawer-data" onClick={this.handleColor2} style={{ backgroundColor: temp3 }}>
                                    {/* <EditOutlinedIcon />
                                    <span className="drawer-names"> Edit labels</span> */}
                                    <EditeLabelComponent/>
                                </span>
                                <Divider />
                            </div>
                            <MenuItem id="archive" className="drawer-data"onClick={this.handleColor3} style={{ backgroundColor: temp4 }}>
                                <ArchiveOutlinedIcon />
                                <span className="drawer-names">Archive</span>
                            </MenuItem>
                            <MenuItem id="bin" onClick={this.handleColor4} style={{ backgroundColor: temp5 }}>
                                <DeleteTwoToneIcon />
                                <span className="drawer-names">Bin</span>
                            </MenuItem>
                            <Divider />

                        </Drawer>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DrawerComponent);