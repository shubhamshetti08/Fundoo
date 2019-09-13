import React, { Component } from 'react'
import { service, addToCart } from '../services/shopingService';
import { Card} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import {withRouter} from 'react-router-dom'
// import Typography from '@material-ui/core/Typography';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import { Tab, Tabs } from '@material-ui/core/';
// function TabContainer(props) {
//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     );
// }
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#212121",
                backgroundColor: "#FFC107",
            }
        },
        MuiCard: {
            root: {
                overflow: "visible",
            }
        }, MuiDialogContent: {
            root: {               
                padding: "0px" ,
                "root:first": {
                    child: {
                        paddingTop: "0px"   
            }
        }
    }
}
    }
})
class ServiceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceData: [],
            open: false,
            price: 0,
            value: 0,
            mouseEnter:false,
            cartId:'',
            cart:'',
            productId:'',
            id:''
        }
    }
    componentWillMount() {
        service()
            .then(res => {
                this.setState({
                    serviceData: res.data.data.data
                })
                console.log("service response", this.state.serviceData);
            })
    }
    handleSignIn = () => {
        this.props.history.push('/login');
    }
    // handleClickOpen = () => {
    //     this.setState({
    //         open: !this.state.open,
    //     })
    // }
    // handleClose = () => {
    //     this.setState({
    //         open: false
    //     })
    // }
    // handleChange = (event, value) => {
    //     this.setState({ value });
    // };
    handleMouseEntry=(id)=>{
        this.setState({
            mouseEnter:true,
            cartId:id
        })
    }
    handleMouseExit=()=>{
        this.setState({
            mouseEnter:false,
           
        })
    }
    postRegId(cart) {
        var data = {
            productId: cart
        }
         addToCart(data)
         .then((res) => {
            console.log("response after add to cart ",res);
            this.setState({
                productId: res.data.data.details.productId,
                name: res.data.data.details.product.name,
                id: res.data.data.details.id
            })
            console.log("service name",this.state.name);
            
            var cartData = {
                productIdCart: this.state.productId,
                cartName: this.state.name,
                idCart: this.state.id
            }
            console.log("service data before sending to register",cartData);
            
            this.props.history.push("/register", cartData);

        }).catch((err) => {
            console.log(err);
        })      
    }
    render() {
        // const { value } = this.state;
        const cardColor=this.state.mouseEnter ? "orange":"gray";
        const serviceArr = this.state.serviceData.map(key => {
            return (
                <div className='allCard' >
                    <MuiThemeProvider theme={theme}>
                        <Card className='lowerCard' 
                         style={{backgroundColor:(this.state.cartId===key.id)? cardColor:"gray"}} >
                            <Card className='upperCard' onClick={()=>this.postRegId(key.id)}
                            onMouseEnter={()=>this.handleMouseEntry(key.id)} onMouseLeave={this.handleMouseExit}>                              
                                <p ><b>Price : ${key.price} per month</b>
                                <div style={{ marginLeft: "20px", color: "blue" }}><b>{key.name}</b></div>
                                    <ul >
                                        <li>
                                            ${key.price}/month
                                            </li>
                                        <li>
                                            {key.description}
                                        </li>
                                    </ul>
                                </p>
                            </Card>
                            ADD TO CART
                    </Card>
                    </MuiThemeProvider>
                    {/* <div>
                        <Dialog position="static"
                            onClose={this.handleClose}
                            open={this.state.open}
                            // onClose={this.state.open}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                             <MuiThemeProvider theme={theme}>
                            <DialogContent >
                                <div >
                                    <AppBar position="static" color="primary">
                                        <h2>fundoo notes</h2>
                                        <div>{key.price}</div>
                                    </AppBar>
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab label="Item One" />
                                        <Tab label="Item Two" />
                                        <Tab label="Item Three" />
                                    </Tabs>
                                    {value === 0 && <TabContainer>Item One</TabContainer>}
                                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                                </div>
                            </DialogContent>
                            </MuiThemeProvider>
                            <DialogActions>
                                <div className="service-button">
                                    <Button onClick={this.handleClose} color="primary">
                                        Disagree
                  </Button>
                                    <Button onClick={this.handleClose} color="primary" autoFocus>
                                        Agree
                  </Button>
                                </div>
                            </DialogActions>
                        </Dialog>
                    </div> */}
                </div>
            )
        })
        return (
            (this.props.cardProps)?
            <div className="register-servicecard">
                    {serviceArr}
                </div>
            :
            <div className="main">
                <div>
                    <MuiThemeProvider theme={theme}>
                        <AppBar position="static" color="primary">
                            {/* <h2 className='fundooNotes'>fundoo notes</h2> */}
                            <h2 className='fundooNotes'>    <span style={{ color: "#2196f3" }}>f</span>
                                <span style={{ color: "#b71c1c" }}>u</span>
                                <span style={{ color: "#4a148c" }}>n</span>
                                <span style={{ color: "#1976d2" }}>d</span>
                                <span style={{ color: "#43a047" }}>o</span>
                                <span style={{ color: "#b71c1c" }}>o</span> notes</h2>
                        </AppBar>
                    </MuiThemeProvider>
                </div>
                <div className="head">
                    <h2>
                        fundooNotes offered. Choose below service to Register.
                        </h2>
                </div>

                <div className="serviceCard_main">
                    {serviceArr}
                </div>
                <p className="serviceLogin" onClick={this.handleSignIn}>Sign in insted</p>
            </div>
        )
    }
}
export default withRouter(ServiceCard);
