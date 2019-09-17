import React, { Component } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import { AppBar, MuiThemeProvider, createMuiTheme, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Avatar from '@material-ui/core/Avatar';

const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#212121",
                backgroundColor: "rgba(255,255,255,1)",
            }
        },
        MuiButton:{
            root: {
                     backgroundColor:"#f1f3f4"
            }
        }
    }
})

export default class DashboardComponent extends Component {
    handleReload = () => {
        window.location.reload();
    }
    render() {
        return (
            <div className="dashboard-page">
                <div className='dashboard-maincard'>
                    <MuiThemeProvider theme={theme}>
                        <AppBar className="dashboard-appbar" position="static" color="primary">
                            <div className="dashboard-imageandfundoo">
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <MenuIcon className="dashboard-menuIcon" />
                                </IconButton>
                                <img className="keep-image" alt="" aria-hidden="true" src={require("../assets/images/keep.png")}
                                    style={{ width: "40px", height: "40px" }}>
                                </img>
                                <span className="dashboard-fundooname">Fundoo</span>
                                <div className="searchdiv">
                                <SearchIcon className="searchicon" style={{ width: "24px", height: "24px" }}/>
                                </div>
                                <InputBase className="dashboard-searchbar" autoComplete="off"
                                    placeholder="Search"

                                    // inputProps={{ 'aria-label': 'search' }}
                                />    
                                 <div className="cleardiv">
                                <ClearIcon className="clearicon" style={{ width: "24px", height: "24px" }}/>
                                </div>  
                                <div className="refreshdiv">                  
                                <RefreshIcon className="refreshicon" onClick={this.handleReload} />
                                {/* <SettingsOutlinedIcon className="settingicon" style={{ width: "24px", height: "24px" }}/>  */}
                                </div>  
                                <Avatar className="avatar" alt="Remy Sharp" src={require("../assets/images/keep.png")}/>                
                                              
                            </div>

                        </AppBar>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}