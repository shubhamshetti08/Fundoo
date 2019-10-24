// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { Divider } from '@material-ui/core';
// import { myCart } from '../services/cartServices'
// class ShoppingCart extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             cartDetails: {},
//             productName: '',
//             desc: '',
//             place: true,
//             address: '',
//             cartId: ''
//         }
//     }
//     componentDidMount() {
//         console.log("this.props.location.state.cartId", this.props);
//         // this.setState({
//         // })
//         this.getDetailsOfCart();
//     }

//     getDetailsOfCart = () => {
//         myCart().then(res => {
//             console.log("res after hitting shopping cart", res.data.data);
//             this.setState({
//                 cartDetails: res.data.data,
//                 productName: res.data.data.product.name,
//                 desc: res.data.data.product.description
//             })
//             console.log("The cart details are", this.state.desc);
//         }).catch(err => {
//             console.log("err in shopping cart details", err);
//         })
//     }

//     handleProceed = () => {
//         this.setState({
//             place: false
//         })
//     }

//     handleAddress = (e) => {
//         this.setState({
//             address: e.target.value
//         })
//     }

//     render() {
//         return (
//             <div className="shopping-container">
//                 <div className="card-container1">
//                     <div className="shopping-card1" style={{ backgroundColor: "#fb0" }}>
//                         <span style={{ fontSize: "1rem" }}>FundooNotes</span>
//                     </div>
//                 </div>
//                 <div>
//                     {this.state.place ?
//                         <div className="shoppingcart-header">
//                             <span style={{ fontSize: "1rem" }}><strong>Shopping Cart</strong></span>
//                         </div>
//                         :
//                         <div className="shoppingcart-header">
//                             <span style={{ fontSize: "1rem" }}><strong>Review order</strong></span>
//                         </div>
//                     }
//                     <Divider />
// {this.state.place ?
//                         <div className="shopping-details">
//                             <div>
//                                 <div className="shopping-card2" style={{ backgroundColor: "grey" }}>
//                                     <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.cartDetails.price} per month {this.state.productName}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="cart-info1">
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
//                                 <li>
//                                     {this.state.desc}
//                                 </li>
//                             </div>
//                             <div className="cart-info2">
//                                 <span style={{ fontSize: "1rem" }}><strong>Price</strong></span>
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
//                             </div>
//                             <div className="cart-info3">
//                                 <span style={{ fontSize: "1rem" }}><strong>Validity</strong></span>
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>per month</span>
//                             </div>
//                             <div>
//                                 <div className="total-box">
//                                     <span style={{ fontSize: "0.9rem" }}>SubTotal(1 item): ${this.state.cartDetails.price}</span>
//                                     <p style={{
//                                         fontSize: "0.9rem", color: "#fff",
//                                         backgroundColor: "#40a1e2", borderRadius: "2px"
//                                     }} onClick={this.handleProceed}>Proceed to Checkout</p>
//                                 </div>
//                             </div>
//                         </div>
//                         :
//                         <div className="shopping-details">
//                             <div>
//                                 <div className="shopping-card2" style={{ backgroundColor: "grey" }}>
//                                     <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.cartDetails.price} per month {this.state.productName}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="cart-info1">
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
//                                 <li>
//                                     {this.state.desc}
//                                 </li>
//                             </div>
//                             <div className="cart-info2">
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
//                                 <span style={{ fontSize: "1rem" }}>per month</span>
//                             </div>
//                             <div>
//                                 <div className="total-box">
//                                     <p style={{
//                                         fontSize: "0.9rem", color: "#fff",
//                                         backgroundColor: "#40a1e2", borderRadius: "2px"
//                                     }}>Place your order</p>
//                                     <span style={{ fontSize: "0.9rem" }}>SubTotal(1 item): ${this.state.cartDetails.price}</span>
//                                 </div>
//                             </div>
//                         </div>}
//                     <Divider />
//                     {this.state.place ?
//                         <div className="cart-info4">
//                             <span style={{ fontSize: "1rem", color: "#40a1e2" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span>
//                         </div>
//                         :
//                         <div 
//  <div className="payment-options">
//                                 <span style={{ fontSize: "1rem" }}>payment method</span>
//                                 <span style={{ fontSize: "1rem", color: "#40a1e2" }}>Cash on Delivery</span>
                            
//                             </div>
//                         </div>
//                     }
//                 </div>
//             </div>
//         )
//     }
// }
// export default withRouter(ShoppingCart);