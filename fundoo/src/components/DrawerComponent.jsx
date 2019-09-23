import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';import { withRouter } from 'react-router-dom';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
// import { width } from '@material-ui/system';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "10.6%"
            },paperAnchorLeft:{
                width: "18%"
        }
    }
}
})
class DrawerComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            open2:false,
            open3:false,
            color:null
        }
    }
    handleColor=()=>{
        this.setState({
            open1:false,
            open2:false,
            open:!this.state.open,
            color:"#fff59d"
        })
    }
    handleColor1=()=>{
        this.setState({
open1:!this.state.open1,
            open:false,
            open2:false,
            color:"#fff59d"
        })
    }
    handleColor2=()=>{
        this.setState({
open2:!this.state.open2,
            open:false,
            open1:false,
            color:"#fff59d"
        })
    }
    render() {
        var temp1=this.state.open?this.state.color:null
        var temp2=this.state.open1?this.state.color:null
        var temp3=this.state.open2?this.state.color:null
        return (
            <div className="drawer-container" >
                <MuiThemeProvider theme={theme} >
                <div  className="drawer-div1">
                    <Drawer variant="persistent" overflow="auto" open={this.props.menuSelect} >                   
                        <MenuItem id="notes" onClick={this.handleColor} style={{backgroundColor:temp1}}>
                            <EmojiObjectsOutlinedIcon />
                           <span className="drawer-names">Notes</span> 
                     </MenuItem>
                        <MenuItem id="notification" onClick={this.handleColor1} style={{backgroundColor:temp2}}>
                            <NotificationsOutlinedIcon   />
                          <span className="drawer-names">Reminders</span>  
                     </MenuItem>
                        <Divider />
                        <div>
                            <h6 style={{paddingLeft:"20px"}}>LABLES</h6>
                            <MenuItem id="editlabel" onClick={this.handleColor2} style={{backgroundColor:temp3}}>
                                <EditOutlinedIcon />
                               <span className="drawer-names"> Edit labels</span>
                    </MenuItem>
                            <Divider />
                        </div>
                        <MenuItem id="archive">
                            <ArchiveOutlinedIcon />
                           <span className="drawer-names">Archive</span> 
                     </MenuItem>
                        <MenuItem id="bin">
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