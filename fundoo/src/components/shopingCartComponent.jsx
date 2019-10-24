import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Stepper, Divider, TextField, Step, StepLabel, IconButton, Button, Snackbar } from '@material-ui/core';
import { getCartDetails } from '../services/shopingService';
import CloseIcon from '@material-ui/icons/Close';
import MobileStepper from '@material-ui/core/MobileStepper';

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
            activateStep:0

        }
    }
    componentDidMount() {
        this.getDetails()
    }
    getDetails = () => {
        var cartId = localStorage.getItem('cartId')

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
        this.setState({ snackbarOpen: true, snackbarMsg: "really!!!!!!" ,  activateStep:this.state.activateStep+1})
    }

    handleOk =async () => {
        await this.setState({
             ok: true,
             open:true,
             snackbarOpen:false,
         })
         document.getElementById('adressId').focus();
     }
     snackbarClose = (e) => {
      
        this.setState({ snackbarOpen: false,  ok: false });
    }

    
    render() {
        return (
            
            <div className="shopping-page">
                <div className="shopping-name-stepper">
                    <div className="shopping-fundooname">
                        FundooNotes
                    </div>
                    <div className="shopping-stepper">
                  
                    </div>
                </div>
                <MobileStepper
                      variant="progress"
                      steps={3}
                      position="static"
                      activeStep={this.state.activateStep}/>
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
                    <div className="shopping-advance-info3">
                        <div className="shopping-subtotal"><span style={{ fontSize: "smaller", marginBottom: "5px" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span></div>
                        <div className="shopping-button1-div" onClick={this.handleProceed}><span className="shopping-button1">proceed to checkout</span></div>
                    </div>
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
                                    rows="4"
                                    // defaultValue="Adress"
                                    margin="normal"
                                    variant="outlined"
                                    id="adressId"
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
                        <Button key="ok" color="primary"  size="small" onClick={this.handleOk}>
                            ok
                </Button>
                    ]}
                />
            </div>
        )
    }
}
export default withRouter(ShopingCart);