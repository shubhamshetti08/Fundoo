import React, { Component } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import { AppBar, MuiThemeProvider, createMuiTheme, IconButton, Tooltip, Card, ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'; import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
// import Avatar from '@material-ui/core/Avatar';
import DrawerComponent from '../components/DrawerComponent';
import AccountComponent from './accountComponent';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { withRouter } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
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
const Bounce = styled.div`animation:3s ${keyframes`${bounce}`} linear`;

class DashboardComponent extends Component {
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
            card: false,
            view: false,
            show: true
        }
    }
    // componentWillMount(){
    //     var mediaQuery=window.matchMedia("(max-width:415px)")
    //         if(mediaQuery.matches){
    //         this.setState({
    //            show:false,
    //             menu:false
            
    //         })
    // }else{
    //     this.setState({
    //         show:false,
    //          menu:false
         
    //      })

    // }
    //     mediaQuery.addListener(key=>{
    //         if(key.matches){
    //         this.setState({
    //             show:false,
    //             menu:false
    //         })
    //     }else{
    //         this.setState({
    //             show:false,
    //              menu:false
             
    //          })
    
    //     }
    //     })
    // }
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
    handleClickAway = () => {
        this.setState({
            card: false
        })
    }
    handleSearchText = (e) => {
        const searchText = e.target.value
        console.log(searchText)
        this.setState({
            searchText: searchText
        })
        console.log('searchbar---', this.state.searchText);

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
            card: true
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
        this.props.transition(this.state.menu)
    }
    handleReload = () => {
        window.location.reload();
    }
    handleGrid = async() => {
       await this.setState({
            view: !this.state.view
        })
        this.props.listView(this.state.view)
    }
    handleList = async() => {
       await this.setState({
            view: !this.state.view
        })
        this.props.listView(this.state.view)
    }
    searchDiv = () => {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
    let search=this.state.show?'keep-image':'keep-image1';
    let fundooName=this.state.show?'dashboard-fundooname':'dashboard-fundooname1';
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

                                {(this.props.location.state === undefined || this.props.location.state[3] === 'editor') ?
                                    <img className={search} alt="" aria-hidden="true" src={require("../assets/images/keep.png")}
                                        style={{ width: "40px", height: "40px" }}>
                                    </img> : null}
                                <Bounce>
                                    <span className={fundooName}>
                                        {console.log('name-----', this.props.location.state)}

                                        {(this.props.location.state !== undefined && this.props.location.state[3] !== 'editor') ? this.props.location.state : "Fundoo"}
                                    </span>
                                </Bounce>
                                {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                                {(this.state.card) ? (

                                    <Card className="searchcard1" style={{ borderRadius: "10px 10px 10px 10px", backgroundColor: "antiquewhite" }}>
                                        <div className="searchdiv1">
                                            <SearchIcon className="searchicon1" style={{ width: "24px", height: "24px" }} />
                                        </div>
                                        <div style={{ width: "80%" }}>
                                            <InputBase className="dashboard-searchbar1" autoComplete="off"
                                                placeholder="Search" onKeyPress={this.handleSearchClick}
                                                onChange={this.handleSearchText}
                                                value={this.state.searchText}
                                            // inputProps={{ 'aria-label': 'search' }}
                                            />
                                        </div>
                                        {(this.state.searchText) ? (
                                            <div className="cleardiv1">
                                                <ClearIcon className="clearicon1" style={{ width: "24px", height: "24px" }}
                                                    onClick={this.handleClearText} />
                                            </div>

                                        ) : (null)}  </Card>)

                                    : (
                                        
                                        <div className="searchcard" style={{ borderRadius: "10px 10px 10px 10px" }}>
                                            {this.state.show ?
                                                <div className="searchdiv" >
                                                    <SearchIcon className="searchicon" style={{ width: "24px", height: "24px" }} onClick={this.searchDiv} />
                                                </div > :
                                                <div className="dashboard-mob-search-card">
                                                    <Card>
                                                        <IconButton onClick={this.searchDiv}><ArrowBackOutlinedIcon /> </IconButton>
                                                        <InputBase className="dashboard-mob-searchbar" autoComplete="off"
                                                            placeholder="Search" onKeyPress={this.handleSearchClick}
                                                            onChange={this.handleSearchText}
                                                            value={this.state.searchText}
                                                        // inputProps={{ 'aria-label': 'search' }}
                                                        />
                                                    </Card>
                                                </div>
                                            }
                                            <div className="dashboard-searchbar-div">
                                                <InputBase className="dashboard-searchbar" autoComplete="off"
                                                    placeholder="Search" onKeyPress={this.handleSearchClick}
                                                    // onChange={this.handleSearchText}
                                                    value={this.state.searchText}
                                                    onClick={this.handleSearchCard}
                                                // inputProps={{ 'aria-label': 'search' }}
                                                />
                                            </div>
                                            {(this.state.searchText) ? (
                                                <div className="cleardiv">
                                                    <ClearIcon className="clearicon" style={{ width: "24px", height: "24px" }}
                                                        onClick={this.handleClearText} />
                                                </div>

                                            ) : (null)}  </div>)
                                }
                                {/* </ClickAwayListener> */}
                                <div className="ref-list-grid-avtar">
                                    <div className="ref-list-grid">
                                        <div className="refreshdiv">
                                            <Tooltip title="Refresh">
                                                <RefreshIcon className="refreshicon" onClick={this.handleReload} />
                                                {/* <SettingsOutlinedIcon className="settingicon" style={{ width: "24px", height: "24px" }}/>  */}
                                            </Tooltip>
                                        </div>
                                        {!this.state.view ?
                                            <div className='grid-view' style={{ width: "34px", height: "34px" }}>
                                                <Tooltip title="Grid view">
                                                    <DashboardOutlinedIcon style={{fontSize:"1.875rem"}}
                                                        onClick={this.handleGrid} />
                                                </Tooltip>
                                            </div>
                                            :
                                            <div className='list-view' style={{ width: "34px", height: "34px" }}>
                                                <Tooltip title="List view">
                                                    <DnsTwoToneIcon style={{fontSize:"1.875rem"}}
                                                        onClick={this.handleList} />
                                                </Tooltip>
                                            </div>
                                        }
                                    </div>
                                    {/* <Avatar className="avatar" alt="Remy Sharp" /> */}
                                    {/* src={require("../assets/images/keep.png")} */}
                                    <AccountComponent />
                                </div>
                            </div>
                        </AppBar>
                    </MuiThemeProvider>
                    {/* <DrawerComponent></DrawerComponent> */}
                </div>
            </div>
        )
    }
}
export default withRouter(DashboardComponent)
