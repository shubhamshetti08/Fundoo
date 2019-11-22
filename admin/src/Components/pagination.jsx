import React, { Component } from "react"; 
import { Pagination } from "react-bootstrap"; 
import PropTypes from "prop-types";

export default class PaginationHandler extends Component {  

   constructor(props) {
    super(props);
    this.state = {
      paging: {
        offset: 0,
        limit: 10
      },
      active: 0
    };  
    }

  pagingHandler = (event) => {
    let offset = parseInt(event.target.id);
    this.setState({
      active: offset
    });
    this.props.pageHandler(event.target.id - 1);   };

  nextHandler = () => {
    let active = this.state.active;
    this.setState({
      active: active + 1
    });
    this.props.pageHandler(active + 1);   };

  backHandler = () => {
    let active = this.state.active;
    this.setState({
      active: active - 1
    });
    this.props.pageHandler(active - 1);   };

  renderPageNumbers = (pageNumbers, totalPages) => {
    let { active } = this.state;
    return (
      <Pagination>
        <Pagination.Prev disabled={active < 5} onClick={ active >5 && this.backHandler} />

        {
      pageNumbers.map(number => {
              if (
                number >= parseInt(active) - 3 &&
                number <= parseInt(active) + 3 
              ) {
                return (
                  <Pagination.Item
                    id={number}
                    active={number === active}
                    onClick={(e)=>this.pagingHandler(e)}
                  >
                    {number}
                  </Pagination.Item>
                );
              } else {
                return null;
              }
        })}
        <Pagination.Next onClick={ active <= totalPages -4 && this.nextHandler} />
      </Pagination>
    );   };

  buildComponent = (props, state) => {
    const { totalPages } = props;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pull-right">
      {this.renderPageNumbers(pageNumbers ,totalPages)}
      </div>
    );   
};

  render() {
    return this.buildComponent(this.props, this.state);
  } 

} 
   PaginationHandler.propTypes = 
   {
    paging: PropTypes.object,
    pageHandler: PropTypes.func,
    totalPages: PropTypes.object 
   };

// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { Navbar, Nav, Card, Table } from "react-bootstrap";
// import { getAdminUsersList, userService } from "../services/adminServices";
// import Pagination from "react-js-pagination";

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userType: [],
//       advance: "",
//       basic: "",
//       allUsers: [],
//       activePage: 1,
//       itemsPerPage: 5,
//       currentArray: [],
//       last: 0,
//       sno: 0
//     };
//   }

//   componentDidMount() {
//     this.getAdminUser();
//     this.pageSet();
//   }

//   getAdminUser = () => {
//     getAdminUsersList()
//       .then(res => {
//         this.setState({
//           allUsers: res.data.data.data
//         });
//         console.log("all users data", this.state.allUsers);
//         const totalUsers = res.data.data.data.length;
//         const type = res.data.data.data.filter(data => {
//           return data.service === "advance";
//         });
//         this.setState({
//           advance: type.length
//         });
//         const n = totalUsers - this.state.advance;
//         this.setState({
//           basic: n
//         });
//         this.getService(this.state.basic, this.state.advance);
//         this.pageSet(this.state.allUsers);
//       })
//       .catch(err => {
//         console.log("Err in getAdmin users list ", err);
//       });
//   };

//   pageSet = async completeData => {
//     // console.log("complete data is ", completeData);
//     // console.log("active page", this.state.activePage);
//     const lastIndex = this.state.activePage * this.state.itemsPerPage;
//     const firstIndex = lastIndex - this.state.itemsPerPage;
//     const currentItems = this.state.allUsers.slice(firstIndex, lastIndex);
//     // console.log("last index", lastIndex);
//     // console.log("first index", firstIndex);
//     // console.log("current items", currentItems);
//     await this.setState({
//       currentArray: currentItems,
//       last: lastIndex,
//       sno: 1
//     });

//     // console.log("curretn array is ", this.state.currentArray);
//   };
//  getService = (basic, advance) => {
//     userService()
//       .then(res => {
//         let data1 = {
//           type: res.data.data.data[0].name,
//           users: advance
//         };
//         let data2 = {
//           type: res.data.data.data[1].name,
//           users: basic
//         };
//         const tempUserType = [];

//         tempUserType.push(data1);
//         tempUserType.push(data2);
//         // console.log("user types are ", this.state.userType);
//         this.setState({
//           userType: tempUserType,
//           sno: 1
//         });
//       })
//       .catch(err => {
//         console.log("Err in user service", err);
//       });
//   };

//   handlePageChange = async pageNumber => {
//     await this.setState({
//       activePage: pageNumber
//     });
//     // console.log("Page number is", this.state.activePage);
//     const lastIndex = this.state.activePage * this.state.itemsPerPage;
//     const firstIndex = lastIndex - this.state.itemsPerPage;
//     const currentItems = this.state.allUsers.slice(firstIndex, lastIndex);
//     // console.log("last index", lastIndex);
//     // console.log("first index", firstIndex);
//     // console.log("current index", currentItems);
//     this.setState({
//       currentArray: currentItems,
//       sno: firstIndex + 1
//     });
//   }

//   handleLogout = () => {
//     this.props.history.push("/");
//   };
//   render() {
//     // console.log("this.state.sno", this.state.sno);
//     const userMap = this.state.userType.map((data, index) => {
//       return (
//         <Card
//           style={{ width: "200px", margin: "2em", border: "1px solid blue" }}
//           key={index}
//         >
//           <Card.Body>
//             <Card.Title>{data.type}</Card.Title>
//             <hr />
//             <Card.Text>{data.users}</Card.Text>
//           </Card.Body>
//         </Card>
//       );
//     });

//     return (
//       <div className="dashboard-container">
//         <Navbar bg="light">
//           <Navbar.Brand>ADMIN DASHBOARD</Navbar.Brand>
//           <Nav>
//             <Nav.Link>USERS</Nav.Link>
//             <Nav.Link>Q & A</Nav.Link>
//             <Nav.Link>PAYMENT</Nav.Link>
//             <Nav.Link onClick={this.handleLogout}>LOGOUT</Nav.Link>
//           </Nav>
//         </Navbar>
//   <div className="d-flex align-items-center justify-content-center">{userMap}</div>
//         <Table variant="dark">
//           <thead>
//             <tr>
//               <th>S.NO</th>
//               <th>FirstName</th>
//               <th>LastName</th>
//               <th>Email</th>
//               <th>Service</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.currentArray.map((data, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{this.state.sno++}</td>
//                   <td>{data.firstName}</td>
//                   <td>{data.lastName}</td>
//                   <td>{data.email}</td>
//                   <td>{data.service}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//         <div>
//           <Pagination
//             activePage={this.state.activePage}
//             itemsCountPerPage={this.state.itemsPerPage}
//             totalItemsCount={this.state.allUsers.length}
//             pageRangeDisplayed={10}
//             onChange={this.handlePageChange}
//           />
//         </div>
//       </div>
//     );
//   }
// }
// export default withRouter(Dashboard);