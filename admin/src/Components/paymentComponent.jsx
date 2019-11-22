import React, { Component } from "react";
import { connect } from 'react-redux'
import { getUsersCartList } from "../Services/AdminServices";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import Pagination from "material-ui-flat-pagination";
import { GET_USER_CART_LIST_SUCCESS } from "../Constants/UserConstants";
function mapStateToProps(state) {
  const getPaymentData = state.paymentReducers.cartData
  const userList = state.dashboardReducers.user
  return { getPaymentData,userList }
}
const dispatchToProps = dispatch => ({
  getPendingPayments: resData =>
    dispatch({ type: GET_USER_CART_LIST_SUCCESS, payload: resData })
});

class PaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentData: [],
      activePage: 1,
      itemsPerPage: 5,
      currentArray: [],
      last: 0,
      sno: 0
    };
  }
  componentDidMount() {
    // this.getAdminUser();
    this.pageSet();
    // this.getService(this.state.basic, this.state.advance);
    console.log("did mount props--", this.props.getPaymentData);
  }
  pageSet = () => {
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const currentItems = this.state.paymentData.slice(firstIndex, lastIndex);
    this.setState({
      currentArray: currentItems,
      last: lastIndex,
      sno: 1
    });
  };
  handlePageChange = async pageNumber => {
    await this.setState({
      activePage: pageNumber
    });
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const currentItems = this.state.paymentData.slice(firstIndex, lastIndex);
    await this.setState({
      currentArray: currentItems,
      sno: firstIndex + 1
    });
    console.log("sno ater back", this.state.currentArray);
  };
  handleClick(e, offset) {
    console.log("e/tardasfas", e.target.textContent);
    let ap = e.target.textContent;
    const lastIndex = ap * this.state.itemsPerPage;
    console.log("last ind4es",lastIndex);
    
    const firstIndex = lastIndex - this.state.itemsPerPage;
    console.log("last ind4es",firstIndex);
    const newArray = this.props.userList.slice(firstIndex, lastIndex);
    console.log("array now generated is ",newArray);
    
    console.log(("new Array is", newArray));
    this.setState({
      currentArray: newArray,
      // sno: firstIndex + 1
    });

  }
  handlePayment=()=>{
    getUsersCartList().then((res)=>{
    console.log('get cart list---',res);
    this.props.getPendingPayments(res);
    // this.props.history.push('/payment')
    }).catch((err)=>{
      console.log('err',err);
    })
    }
  render() {
    console.log("payment render", this.props.getPaymentData);
    return <div>
             <MDBTable variant="dark" bordered>
          <MDBTableHead>
            <tr>
              {/* <th>S.NO</th> */}
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {console.log('222',this.props.getPaymentData)}
            {this.props.getPaymentData.map((data, index) => {
              console.log('44444---',data );
              
              return (
                <tr key={index}>
                  {/* <td>{this.state.sno++}</td> */}
                  <td>{data.user===undefined ?
              "--" : data.user.firstName }</td>
                  <td>{data.user===undefined? '--':data.user.lastName}</td>
                  <td>{data.user===undefined? '--':data.user.addresses[0].address}</td>
                  <td>{data.user===undefined?'---':data.user.service}</td>
                  <td>{data.user===undefined?'---':data.status}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <div>
          <Pagination
            limit={this.state.itemsPerPage}
            offset={this.state.offset}
            total={this.props.userList.length}
            onClick={(e, offset) => this.handleClick(e, offset)}
          />
        </div>
    </div>;
  }
}
export default connect(
  mapStateToProps,
  dispatchToProps)(PaymentComponent);
