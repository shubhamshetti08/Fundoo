import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, TextField, IconButton, Button, Snackbar, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { getCartDetails } from '../services/shopingService';
import CloseIcon from '@material-ui/icons/Close';
import MobileStepper from '@material-ui/core/MobileStepper';
import {placeOrder} from '../services/shopingService';
const theme = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            root: {
                height: "4px",
                overflow: "hidden",
                position: "absolute"
            }
        }
    }
})

class ShopingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails: '',
            price: '',
            open: false,
            snackbarOpen: false,
            snackbarMsg: '',
            ok: false,
            activateStep: 0,
            address:''

        }
    }
    componentDidMount() {
        this.getDetails()
    }
    getDetails = () => {
        console.log("111221----",this.props.location.state);
        
        var cartId = this.props.location.state

        getCartDetails(cartId)
            .then((res) => {
                console.log('shopping cart responce--', res);
                this.setState({
                    price: res.data.data.price,
                    cartDetails: res.data.data.product
                })
                console.log('555555-----', this.state.price);
                console.log('66666666----', this.state.cartDetails);

            })
            .catch((err) => {
                console.log(err);
            })
    }
    handleProceed = () => {
        this.setState({ snackbarOpen: true, snackbarMsg: "really!!!!!!" })
    }

    handlePlaceOrder = () => {
        if (this.state.address !== '') {
            let data = {
                // "cartId": localStorage.getItem('cartId'),
                "cartId":this.props.location.state,
                "address": this.state.address,
            }
            placeOrder(data).then(res => {
                console.log("res after hitting place order is ", res);
                this.setState({
                    // order: false,
                    activateStep: this.state.activateStep + 1
                })
            }).catch(err => {
                console.log("err in hitting place order ", err);

            })
        } else {
            this.setState({
                snackbarOpen:true,
                snackbarMsg: 'address cant be empty'
            })
        }
    }
    handleOk = async () => {
        await this.setState({
            ok: true,
            open: true,
            snackbarOpen: false,
            activateStep: this.state.activateStep + 1
        })
        document.getElementById('adressId').focus();
    }
    snackbarClose = (e) => {

        this.setState({ snackbarOpen: false, ok: false });
    }
handleAddress=(e)=>{
    this.setState({
        address:e.target.value
    });
}

    render() {
        return (

            <div className="shopping-page">
                <div className="shopping-name-stepper">
                    <div className="shopping-fundooname">
                        FundooNotes
                    </div>
                    <MuiThemeProvider theme={theme}>
                        <div className="shopping-stepper">
                            <MobileStepper
                                variant="progress"
                                steps={3}
                                position="fixed"
                                activeStep={this.state.activateStep} />
                        </div>
                    </MuiThemeProvider>
                </div>

                <div className="shopping-div2">
                    {this.state.place ?
                        <div className="shopping-shoppingCart">
                            <b>Shopping Cart</b>
                        </div>
                        :
                        <div className="shopping-review">
                            <b>Review Your Order</b>
                        </div>
                    }
                    <Divider />
                </div>
                <div className="shopping-div3">
                    <div className="shopping-browncard">
                        <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.price} per month {this.state.cartDetails.name}
                        </span>
                    </div>
                    <div className="shopping-advance">
                        <div className="shopping-advance-title">
                            <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
                            <li style={{ fontSize: "smaller" }}>
                                {this.state.cartDetails.description}
                            </li>
                        </div>

                        <div className="shopping-advance-info1">
                            <span style={{ fontSize: "1rem" }}><strong>Price</strong></span>
                            <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
                        </div>
                        <div className="shopping-advance-info2">
                            <span style={{ fontSize: "1rem" }}><strong>Validity</strong></span>
                            <span style={{ fontSize: "1rem", color: "#40a1e2" }}>per month</span>
                        </div>
                    </div>
                    {/* {!this.state.ok ?
                    <div className="shopping-advance-info3">
                        <div className="shopping-subtotal"><span style={{ fontSize: "smaller", marginBottom: "5px" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span></div>
                        <div  className="shopping-button1-div" onClick={this.handleProceed}><span style={{cursor:"pointer"}}className="shopping-button1">proceed to checkout</span></div>
                    </div>
                    :
                    <div className="shopping-advance-info3">
                    <div className="shopping-subtotal"><span style={{ fontSize: "smaller", marginBottom: "5px" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span></div>
                    <div className="shopping-button1-div" ><span style={{cursor:"pointer"}} className="shopping-button1">Place order</span></div>
                </div>
                    } */}

                    {/* There’s another popular technique called iify ( IIFE — Immediately-invoked function expressions) replaces ternary */}
                    {(() => {
                        if (this.state.ok !== true) {
                            return (<div className="shopping-advance-info3">
                                <div className="shopping-subtotal"><span style={{ fontSize: "smaller", marginBottom: "5px" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span></div>
                                <div className="shopping-button1-div" onClick={this.handleProceed}><span style={{ cursor: "pointer" }} className="shopping-button1">proceed to checkout</span></div>
                            </div>)
                        }
                        else {
                            return (
                                <div className="shopping-advance-info3">
                                    <div className="shopping-subtotal"><span style={{ fontSize: "smaller", marginBottom: "5px" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span></div>
                                    {/* {this.state.address.length>0 ? */}
                                    <div className="shopping-button1-div" onClick={this.handlePlaceOrder}><span style={{ cursor: "pointer" }} className="shopping-button1">Place order</span></div>
                                    {/* : */}
                                    {/* <span>adress cant be empty</span> */}
                                    {/* } */}
                                </div>
                            )
                        }
                    })()
                    }
                </div>
                <Divider />
                <div className="shopping-advance-info4">
                    {!this.state.open ?
                        <span style={{ fontSize: "1rem", color: "#40a1e2" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span>
                        :
                        <div className="shopping-div4">
                            <div>
                                <TextField
                                    label="Multiline"
                                    multiline
                                    required
                                    rows="4"
                                    // defaultValue="Adress"
                                    margin="normal"
                                    variant="outlined"
                                    id="adressId"
                                    value={this.state.address}
                                    onChange={this.handleAddress}
                                />
                            </div>
                            <div className="shopping-div4-delivery">
                                <span style={{ margin: "15px 15px 15px 15px" }}>payment Method</span>
                                <span style={{ color: "#1e8ad1", margin: "0px 15px 15px 15px" }}>Cash On Delivery</span>
                            </div>
                        </div>
                    }
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}
                    message={<span id="messege-id">{this.state.snackbarMsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        > <CloseIcon />
                        </IconButton>,
                        <Button key="ok" color="primary" size="small" onClick={this.handleOk}>
                            ok
                </Button>
                    ]}
                />
                
            </div>
        )
    }
}
export default withRouter(ShopingCart);