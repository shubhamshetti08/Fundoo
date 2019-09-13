// import React from 'react';
// import { service } from "../services/shopingService";
// import { Card } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button'
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// //import DialogContentText from '@material-ui/core/DialogContentText';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// // import PropTypes from 'prop-types';
// // import Box from '@material-ui/core/Box';



// //import ButtonBase from '@material-ui/core/ButtonBase';
// //import CardMedia from '@material-ui/core/CardMedia';
// //import CardContent from '@material-ui/core/CardContent';
// //import CardActions from '@material-ui/core/CardActions';
// function TabContainer(props) {
//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     );
// }

// const theme = createMuiTheme({
//     overrides: {
//         MuiAppBar: {
//             colorPrimary: {
//                 color: "#212121",
//                 backgroundColor: "#FFC107",
//             }
//         }
//     }
// })
// export default class card extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             serviceData: [],
//             open: false,
//             value: 0,
//             i: 0
//         }
//     }
//     componentWillMount() {
//         service()
//             .then(response => {
//                 console.log('Response from service', response);
//                 this.setState({
//                     serviceData: response.data.data.data
//                 })
//                 console.log("service data--------", this.state.serviceData)
//             })
//     }
//     handleClickOpen = () => {
//         if (this.state.i === 0) {
//             this.setState({
//                 open: true,
//                 i: 1
//             })
//         }
//     }
//     handleClose = () => {
//         this.setState({
//             open: false,
//             i: 0
//         })
//     }
//     handleChange = (event, value) => {
//         this.setState({ value });
//     };
//     render() {
//         const { value } = this.state;
//         console.log("data---------------", this.state.serviceData.length);

//         const firstCardData = this.state.serviceData.map((object, index) => {
//             console.log('object is --------', object);
//             console.log('index is --------', index);

//             if (index === 0) {
//                 return (

//                     <div >

//                         <p ><b style={{ marginLeft: "20px" }}>Price : ${object.price} per month<br /></b> <br /><span style={{ marginLeft: "20px", color: "blue" }}>{object.name}</span>
//                             <ul style={{ paddingTop: '20px' }}>
//                                 <li>
//                                     ${object.price}/month
//                             </li>
//                                 <li style={{ paddingTop: '20px' }}>
//                                     {object.description}
//                                 </li>
//                             </ul>
//                         </p>

//                     </div>


//                 )
//             } else {
//                 return true;
//             }

//         })
//         const secondCardData = this.state.serviceData.map((object, index) => {
//             console.log('object is --------', object);
//             console.log('index is --------', index);
//             if (index === 1) {
//                 return (

//                     <div>

//                         <p ><b style={{ marginLeft: "20px" }}>Price : ${object.price} per month<br /></b> <br /><span style={{ marginLeft: "20px", color: "blue" }}>{object.name}</span>
//                             <ul style={{ paddingTop: '20px' }}>
//                                 <li>
//                                     ${object.price}/month
//                             </li>
//                                 <li style={{ paddingTop: '20px' }}>
//                                     {object.description}
//                                 </li>
//                             </ul>
//                         </p>

//                     </div>

//                 )
//             } else {
//                 return true;
//             }
//         })
//         return (
//             <div>
//                 <div>
//                     <MuiThemeProvider theme={theme}>
//                         <AppBar position="static" color="primary">
//                             <Toolbar>
//                                 <IconButton
//                                     edge="start"
//                                     color="inherit"
//                                     aria-label="menu"
//                                 >
//                                 </IconButton>
//                                 <Typography variant="h6" color="inherit">
//                                     <h2>fundoo notes</h2>
//                                 </Typography>
//                             </Toolbar>
//                         </AppBar>
//                     </MuiThemeProvider>
//                 </div>
//                 <div className="head">
//                     <h2>
//                         fundooNotes offered. Choose below service to Register.
//             </h2>
//                 </div>
//                 <div className="cards">
//                     <div className="cardpart1" onClick={this.handleClickOpen}  >
//                         <Card className="lowerCard1" style={{ backgroundColor: "grey" }}>
//                             <div>
//                                 <h2 style={{ marginLeft: "40px", marginTop: "220px" }}>add to cart</h2>
//                             </div>
//                         </Card>
//                         <Card className="upperCard1" >
//                             <div>
//                                 <Dialog position="static"
//                                     onClose={this.handleClose}
//                                     open={this.state.open}
//                                     // onClose={this.state.open}
//                                     aria-labelledby="alert-dialog-title"
//                                     aria-describedby="alert-dialog-description"
//                                 >
//                                         <DialogContent >
//                                             <div >
//                                                 <AppBar position="static" color="primary">

//                                                     <h2>fundoo notes</h2>

//                                                 </AppBar>
                                               
//                                                 <Tabs value={value} onChange={this.handleChange}>
//                                                     <Tab label="Item One" />
//                                                     <Tab label="Item Two" />
//                                                     <Tab label="Item Three" />
//                                                 </Tabs>

                                              
//                                                 {value === 0 && <TabContainer>Item One</TabContainer>}
//                                                 {value === 1 && <TabContainer>Item Two</TabContainer>}
//                                                 {value === 2 && <TabContainer>Item Three</TabContainer>}
//                                             </div>
//                                         </DialogContent>
//                                         <DialogActions>
//                                         <div className="service-button">
//                                             <Button onClick={this.handleClose} color="primary">
//                                                 Disagree
//                   </Button>
//                                             <Button onClick={this.handleClose} color="primary" autoFocus>
//                                                 Agree
//                   </Button>
//                                         </div>
//                                     </DialogActions>
//                                 </Dialog>
//                                 <div>
//                                     {firstCardData}
//                                 </div>
//                             </div>
//                         </Card>
//                     </div>
//                     <div className="cardpart2">
//                         <Card className="lowerCard2" style={{ backgroundColor: "grey" }}>
//                             <div>
//                                 <h2 style={{ marginLeft: "40px", marginTop: "220px" }}>add to cart</h2>
//                             </div>
//                         </Card>
//                         <Card className="upperCard2">
//                             <div>
//                                 {secondCardData}
//                             </div>
//                         </Card>
//                     </div>

//                 </div>
//                 <div className="signIn">
//                     <Button onClick={this.handleForgotClick} style={{ textTransform: "none" }} color='primary' >
//                         sign in instead
//                     </Button>
//                 </div>
//             </div>
//         );

//     }
// }
