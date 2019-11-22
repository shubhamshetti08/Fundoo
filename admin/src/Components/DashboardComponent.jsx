import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact'
import { getAdminUsersList, userService, getUsersCartList } from '../Services/AdminServices';
import { connect } from 'react-redux';
import { GET_USER_CART_LIST_SUCCESS } from '../Constants/UserConstants';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Pagination from "material-ui-flat-pagination";
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
// function mapStateToProps(state){
//   return{
//   userList:state.dashBoardReducers.user
// }
// }
const dispatchToProps = dispatch => ({
  getPendingPayments: resData =>
    dispatch({ type: GET_USER_CART_LIST_SUCCESS, payload: resData })
});
function mapStateToProps(state) {
  // const getPaymentData=state.paymentReducers.cartData
  const userList = state.dashboardReducers.user;
  console.log("user list ", userList);
  return { userList };
}
class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [],
      advance: "",
      basic: "",
      allUsers: [],
      activePage: 1,
      itemsPerPage: 5,
      currentArray: [],
      last: 0,
      sno: 0,
      offset: 0,
      showData: true
    };
  }

  componentDidMount() {
    this.getAdminUser();
    this.pageSet();
    this.getService(this.state.basic, this.state.advance);
    console.log("dashboard data  ", this.props.userList);
  }

  getAdminUser = () => {
    getAdminUsersList()
      .then(res => {
        this.setState({
          allUsers: res.data.data.data
        });
        console.log("all users data", this.state.allUsers);
        const totalUsers = res.data.data.data.length;
        const type = res.data.data.data.filter(data => {
          return data.service === "advance";
        });
        this.setState({
          advance: type.length
        });
        const n = totalUsers - this.state.advance;
        this.setState({
          basic: n
        });
        this.getService(this.state.basic, this.state.advance);
        this.pageSet(this.state.allUsers);
      })
      .catch(err => {
        console.log("Err in getAdmin users list ", err);
      });
  };

  pageSet = async completeData => {
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const currentItems = this.state.allUsers.slice(firstIndex, lastIndex);
    await this.setState({
      currentArray: currentItems,
      last: lastIndex,
      sno: 1
    });
  };

  getService = (basic, advance) => {
    userService()
      .then(res => {
        let data1 = {
          type: res.data.data.data[0].name,
          users: advance
        };
        let data2 = {
          type: res.data.data.data[1].name,
          users: basic
        };
        const tempUserType = [];

        tempUserType.push(data1);
        tempUserType.push(data2);
        // console.log("user types are ", this.state.userType);
        this.setState({
          userType: tempUserType,
          sno: 1
        });
      })
      .catch(err => {
        console.log("Err in user service", err);
      });
  };
  // handlePageChange = async pageNumber => {
  //   await this.setState({
  //     activePage: pageNumber
  //   });
  //   console.log("Page number is", this.state.activePage);
  //   const lastIndex = this.state.activePage * this.state.itemsPerPage;
  //   const firstIndex = lastIndex - this.state.itemsPerPage;
  //   const currentItems = this.props.userList.slice(firstIndex, lastIndex);
  //   console.log("last index", lastIndex);
  //   console.log("first index", firstIndex);
  //   console.log("current index", currentItems);
  //   console.log("current array", this.state.currentArray);

  // }
  handleClick(e, offset) {
    console.log("e/tardasfas", e.target.textContent);
    let ap = e.target.textContent;
    const lastIndex = ap * this.state.itemsPerPage;
    console.log("last ind4es", lastIndex);

    const firstIndex = lastIndex - this.state.itemsPerPage;
    console.log("last ind4es", firstIndex);
    const newArray = this.props.userList.slice(firstIndex, lastIndex);
    console.log("array now generated is ", newArray);

    console.log(("new Array is", newArray));
    this.setState({
      currentArray: newArray,
      // sno: firstIndex + 1
    });

  }
  handlePayment =async () => {
   await this.setState({ showData: false })
    console.log('22222----',this.state.showData);
    
   await getUsersCartList().then((res) => {
      console.log('get cart list---', res);
      this.props.getPendingPayments(res);
      this.props.history.push('/payment')
    }).catch((err) => {
      console.log('err', err);
    })
  }
  render() {
    const userMap = this.state.userType.map((data, index) => {
      console.log('111111', data);

      // const userMap = this.props.userList.map((data, index) => {
      return (
        <MDBCard
          style={{ width: "263px", margin: "2em", border: "1px solid orange" }}
          key={index}
        >
          <MDBCardBody style={{ textAlign: "center" }}>
            <MDBCardTitle>{data.type}</MDBCardTitle>
            <hr />
            <MDBCardText style={{ textAlign: "center" }}>{data.users}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      );
    });
    return (
    
  
           <div className="dashboard-page">
             {console.log('77777',this.state.showData)}
                 {this.state.showData ?
                 <div>
          <div className="">
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
              <div className="db-ab-names">
                <b style={{ padding: "10px" }}>DASH BOARD</b>
                <ul class="navbar-navs mr-auto">
                  <li className="nav-item ">
                    <a className="nav-link" href=" ">Users
          {/* <span class="sr-only">(current)</span> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/questionanswer">Q&A</a>
                  </li>
                  <li className="nav-item">
                    <Button onClick={this.handlePayment}>Payment</Button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
         <div className="d-flex align-items-center justify-content-center">{userMap}</div>
        <MDBTable variant="dark" bordered>
          <MDBTableHead>
            <tr>
               <th>S.NO</th> 
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Service</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.currentArray.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.service}</td>
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
        </div>
        :
        <div className="">
        <nav className="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
          <div className="db-ab-names">
            <b style={{ padding: "10px" }}>DASH BOARD</b>
            <ul class="navbar-navs mr-auto">
              <li className="nav-item ">
                <a className="nav-link" href=" ">Users
      {/* <span class="sr-only">(current)</span> */}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/questionanswer">Q&A</a>
              </li>
              <li className="nav-item">
                <Button onClick={this.handlePayment}>Payment</Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
     }
      </div>
    )
  }
}

 {/* const actionCreators = {
  login: userActions.login
};
function mapState(state){
return {state};
}; */}

export default withRouter(connect(
  mapStateToProps,
  dispatchToProps,
)(DashboardComponent));


