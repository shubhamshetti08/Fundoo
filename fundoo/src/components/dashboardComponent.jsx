import React, { Component } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import { AppBar, MuiThemeProvider, createMuiTheme, IconButton, Tooltip, Card ,ClickAwayListener} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
// import Avatar from '@material-ui/core/Avatar';
import DrawerComponent from '../components/DrawerComponent';
import AccountComponent from './accountComponent';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#212121",
                backgroundColor: "rgba(255,255,255,1)",
            }
        },
        MuiButton: {
            root: {
                backgroundColor: "#f1f3f4"
            }
        }
    }
})

export default class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            notes: '',
            title: '',
            noteOpen: false,
            bgColor: '',
            searchText: '',
            clr: false,
            menu: false,
            card:false,
            view:false
        }
    }
    // handleNotes = (e) => {
    //     const notes = e.target.value;
    //     this.setState({
    //         notes: notes
    //     })
    // }

    // handleTitle = (e) => {
    //     const title = e.target.value;
    //     this.setState({
    //         title: title
    //     })
    // }
    // handleNoteClick = () => {
    //     this.setState({
    //         noteOpen: !this.state.noteOpen
    //     })
    // }
    handleClickAway=()=>{
        this.setState({
            card:false
        })
    }
    handleSearchText = (e) => {
        const searchText = e.target.value
        console.log(searchText)
        this.setState({
            searchText: searchText
        })
        console.log('searchbar---',this.state.searchText);
        
        this.props.searchBar(this.state.searchText);
    }
    handleClearText = () => {
        this.setState({
            searchText: '',
            clr: false
        });
    }
    handleSearchCard = () => {
        this.setState({
            card:true
        });
    }
    handleSearchClick = () => {
        this.setState({
            clr: true
        })
    }
    handleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    handleReload = () => {
        // window.location.reload();
    }
    handleGrid=()=>{
        this.setState({
            view:!this.state.view
        })
        this.props.listView(this.state.view)
    }
    handleList=()=>{
        this.setState({
            view:!this.state.view
        }) 
        this.props.listView(this.state.view)
    }
    render() {
        return (
            <div className="dashboard-page">
                <div className='dashboard-maincard'>
                    <MuiThemeProvider theme={theme}>
                        <AppBar className="dashboard-appbar" position="fixed" color="primary">
                            <div className="dashboard-imageandfundoo">
                                <Tooltip title="menu">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={this.handleMenu}
                                    >
                                        <MenuIcon className="dashboard-menuIcon" />
                                    </IconButton>
                                </Tooltip>
                                <DrawerComponent menuSelect={this.state.menu} />
                                <img className="keep-image" alt="" aria-hidden="true" src={require("../assets/images/keep.png")}
                                    style={{ width: "40px", height: "40px" }}>
                                </img>
                                <span className="dashboard-fundooname">Fundoo</span>
                                <ClickAwayListener onClickAway={this.handleClickAway}>
                                {(this.state.card) ?(
                                   
                                <Card className="searchcard1" style={{borderRadius:"10px 10px 10px 10px",backgroundColor:"antiquewhite"}}>
                                <div className="searchdiv1">
                                    <SearchIcon className="searchicon1" style={{ width: "24px", height: "24px" }} />
                                </div>
                                <InputBase className="dashboard-searchbar1" autoComplete="off"
                                    placeholder="Search" onKeyPress={this.handleSearchClick}
                                    onChange={this.handleSearchText}
                                    value={this.state.searchText}
                                // inputProps={{ 'aria-label': 'search' }}
                                />
                                {(this.state.searchText) ? (
                                    <div className="cleardiv1">
                                        <ClearIcon className="clearicon1" style={{ width: "24px", height: "24px" }}
                                            onClick={this.handleClearText} />
                                    </div>
                                   
                                ) : (null)}  </Card>)
                                
                                :(
                                 <div className="searchcard" style={{borderRadius:"10px 10px 10px 10px"}}>
                                <div className="searchdiv">
                                    <SearchIcon className="searchicon" style={{ width: "24px", height: "24px" }} />
                                </div>
                                <InputBase className="dashboard-searchbar" autoComplete="off"
                                    placeholder="Search" onKeyPress={this.handleSearchClick}
                                    // onChange={this.handleSearchText}
                                    value={this.state.searchText}
                                    onClick={this.handleSearchCard}
                                // inputProps={{ 'aria-label': 'search' }}
                                />
                                {(this.state.searchText) ? (
                                    <div className="cleardiv">
                                        <ClearIcon className="clearicon" style={{ width: "24px", height: "24px" }}
                                            onClick={this.handleClearText} />
                                    </div>
                                   
                                ) : (null)}  </div>)
                                }
                                </ClickAwayListener>
                                <div className="ref-list-grid">
                                <div className="refreshdiv">
                                <Tooltip title="Refresh">
                                    <RefreshIcon className="refreshicon" onClick={this.handleReload} />
                                    {/* <SettingsOutlinedIcon className="settingicon" style={{ width: "24px", height: "24px" }}/>  */}
                                    </Tooltip>
                                </div>
                                {!this.state.view ?
                                <div className='grid-view'style={{ width: "34px", height: "34px"}}>
                                    <Tooltip title="Grid view">
                                <DashboardOutlinedIcon fontSize="large"
                                onClick={this.handleGrid}/>
                                </Tooltip>
                                </div>
                                :
                                <div className='list-view'style={{ width: "34px", height: "34px"}}>
                                     <Tooltip title="List view">
                                <DnsTwoToneIcon fontSize="large"
                                onClick={this.handleList}/>
                                </Tooltip>
                                </div>
                                }
                                </div>
                                {/* <Avatar className="avatar" alt="Remy Sharp" /> */}
                                {/* src={require("../assets/images/keep.png")} */}
                                <AccountComponent/>
                            </div>

                        </AppBar>
                    </MuiThemeProvider>
                    {/* <DrawerComponent></DrawerComponent> */}
                </div>
            </div>
        )
    }
}
