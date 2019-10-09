import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'; import { withRouter } from 'react-router-dom';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import ReminderComponent from './reminderComponent';
// import { yellow } from '@material-ui/core/colors';
// import { width } from '@material-ui/system';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "10.6%"
            },
            paperAnchorLeft: {
                width: "18%"
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
            appTitle:''
        }
    }
    handleColor = () => {
        this.setState({
            open1: false,
            open2: false,
            open3:false,
            open4:false,
            open: !this.state.open,
            color: "#FEEFC3"
        })
        this.props.history.push('/dashboard');
    }
    handleColor1 = async () => {
       await this.setState({
            open1: !this.state.open1,
            open: false,
            open2: false,
            open3:false,
            open4:false,
            color: "#FEEFC3",
            appTitle:"Reminder"
        })
        this.props.history.push('/reminder',this.state.appTitle);
    }
    handleColor2 = () => {
        this.setState({
            open2: !this.state.open2,
            open: false,
            open1: false,
            open3:false,
            open4:false,
            color: "#FEEFC3"
        })
    }
    handleColor3 =async  () => {
       await this.setState({
            open3: !this.state.open3,
            open: false,
            open1: false,
            open2:false,
            open4:false,
            color: "#FEEFC3",
            appTitle:"Archive"
        })
        this.props.history.push('/archive',this.state.appTitle);
        console.log('title----',this.state.appTitle);
        
    }
    handleColor4 =async () => {
       await this.setState({
            open4: !this.state.open4,
            open: false,
            open1: false,
            open2:false,
            open3:false,
            color: "#FEEFC3",
            appTitle:"Trash"
        })
        this.props.history.push('/trash',this.state.appTitle);
    }
    render() {
        var temp1 = this.state.open ? this.state.color : null
        var temp2 = this.state.open1 ? this.state.color : null
        var temp3 = this.state.open2 ? this.state.color : null
        var temp4 = this.state.open3 ? this.state.color : null
        var temp5 = this.state.open4 ? this.state.color : null
        return (
            <div className="drawer-container" >
                <MuiThemeProvider theme={theme} >
                    <div className="drawer-div1" style={{ borderRadius: "0px 50px 50px 0px" }}>
                        <Drawer variant="persistent" overflow="auto" open={this.props.menuSelect}  >
                            <MenuItem id="notes" onClick={this.handleColor} style={{ backgroundColor: temp1 }}>
                                <EmojiObjectsOutlinedIcon />
                                <span className="drawer-names">Notes</span>
                            </MenuItem>
                            <MenuItem id="notification" onClick={this.handleColor1} style={{ backgroundColor: temp2 }}>
                                <ReminderComponent/>
                                <span className="drawer-names">Reminders</span>
                            </MenuItem>
                            <Divider />
                            <div>
                                <h6 style={{ paddingLeft: "20px" }}>LABLES</h6>
                                <MenuItem id="editlabel" onClick={this.handleColor2} style={{ backgroundColor: temp3 }}>
                                    <EditOutlinedIcon />
                                    <span className="drawer-names"> Edit labels</span>
                                </MenuItem>
                                <Divider />
                            </div>
                            <MenuItem id="archive" onClick={this.handleColor3} style={{ backgroundColor: temp4 }}>
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