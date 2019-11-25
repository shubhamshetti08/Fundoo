import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import i from '@mdi/react';
// import { mdiAccount } from '@mdi/js';
// import { mdiMagnify } from '@mdi/js';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
// import { Form, Input, Icon, Tooltip, Card, Avatar } from 'antd';
class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    return (
      <div className="container-scroller">
        <nav className="navbar horizontal-layout col-lg-12 col-12 p-0 ">
          <div className="container d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-top w-100 ">
              <a className="navbar-brand brand-logo  mr-0 px-4 d-flex ">
                <img style={{ width: "170px", height: "60px" }} src={require("../Assets/images/i.svg")}></img>
              </a>
              <div className="navbar-menu-wrapper d-flex align-content-end p-4  flex-row ml-auto">
                <form className="search-field w-80">
                  <div className="form-group mb-0">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input className="form-control" type="text"></input>
                      </div>

                      <ul className="navbar-nav navbar-nav-right mr-0 flex-row justify-content-around ml-50 ">
                        <li className="nav-item dropdown ml-4">
                          <a className="nav-link count-indicator"
                            href="#registration"
                            id="notificationDropdown"
                            data-toggle="dropdown"
                          >
                            <FontAwesomeIcon icon={faBell} size="lg" style={{ color: "#814eff" }} transform="grow-1 right-9.5 down-5.5" />
                            <span className="count">4</span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown" >

                            <a className="dropdown-item py-3 flex-row" href="#registration">
                              <p className="mb-0 font-weight-medium float-left">You have 4 new notifications </p>
                              <span className="badge badge-pill badge-inverse-info float-right">View all</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item" href="#registration">
                              <div className="preview-thumbnail">
                                <div className="preview-icon bg-inverse-success">
                                  <i className="fas fa-exclamation-circle"></i>
                                </div>
                              </div>
                              <div className="preview-item-content">
                                <h6 className="preview-subject font-weight-normal text-dark mb-1">Application Error</h6>
                                <p className="font-weight-light small-text mb-0">
                                  Just now
                              </p>
                              </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item" href="#registration">
                              <div class="preview-thumbnail">
                                <div class="preview-icon bg-inverse-warning">
                                  <i class="fab fa-facebook-messenger"></i>
                                </div>
                              </div>
                              <div class="preview-item-content">
                                <h6 class="preview-subject font-weight-normal text-dark mb-1">Settings</h6>
                                <p class="font-weight-light small-text mb-0">
                                  Private message
                    </p>
                              </div>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item preview-item" href="#registration">
                              <div class="preview-thumbnail">
                                <div class="preview-icon bg-inverse-info">
                                  <i class="far fa-envelope"></i>
                                </div>
                              </div>
                              <div class="preview-item-content">
                                <h6 class="preview-subject font-weight-normal text-dark mb-1">New user registration</h6>
                                <p class="font-weight-light small-text mb-0">
                                  2 days ago
                    </p>
                              </div>
                            </a>
                          </div>

                        </li>
                        {/* <i class="fas fa-coffee fa-xs"></i> */}
                        {/* <Avatar size={2} style={{height:"10px",width:"10px"}}  src={require("../Assets/images/download.jpeg")} /> */}
                        <div className="nav-item dropdown ml-4 ">
                          <img className="img-xs rounded-circle" src={require("../Assets/images/download.jpeg")} ></img>
                          <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                            <a className="dropdown-item mt-2"> manage account</a>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="nav-bottom">
            <div className="container">
              <ul className="nav page-navigation">
                <li className="nav-item active">
                  <div className="nav-link">
                    <span className="menu-title">DASH BOARD</span>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="nav-link">
                    <i class="link-icon far fa-compass"></i>
                    <span className="menu-title">WEDGES</span>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="nav-link">
                    <i class="link-icon  fas fa-atom"></i>
                    <span className="menu-title">UI ELEMENTS</span>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="nav-link">
                    <i class="link-icon far fa-flag"></i>
                    <span className="menu-title">PAGES</span>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="nav-link">
                    <i class="link-icon fab fa-autoprefixer"></i>
                    <span className="menu-title">FORMS</span>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="nav-link">
                    <i class="link-icon fas fa-asterisk"></i>
                    <span className="menu-title">APPS</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </nav>


        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-12 grid-margin">
                  <div class="card card-statistics">
                    <div class="row">
                      <div class="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                        <div class="card-body">
                          <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                            <i class="fas fa-user-friends text-primary mr-0 mr-sm-4 icon-lg"></i>
                            {/* <i class="mdi mdi-account-multiple-outline text-primary mr-0 mr-sm-4 icon-lg"></i> */}
                            <div class="wrapper text-center text-sm-left">
                              <p class="card-text mb-0">New Users</p>
                              <div class="fluid-container">
                                <h3 class="card-title mb-0">65,650</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                        <div class="card-body">
                          <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                            {/* <i class="mdi mdi-checkbox-marked-circle-outline text-primary mr-0 mr-sm-4 icon-lg"></i> */}
                            <i class="far fa-check-circle text-primary mr-0 mr-sm-4 icon-lg"></i>
                            <div class="wrapper text-center text-sm-left">
                              <p class="card-text mb-0">New Feedbacks</p>
                              <div class="fluid-container">
                                <h3 class="card-title mb-0">32,604</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                        <div class="card-body">
                          <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                            {/* <i class="mdi mdi-trophy-outline text-primary mr-0 mr-sm-4 icon-lg"></i> */}
                            <i class="fas fa-trophy  text-primary mr-0 mr-sm-4 icon-lg"></i>
                            <div class="wrapper text-center text-sm-left">
                              <p class="card-text mb-0">Employees</p>
                              <div class="fluid-container">
                                <h3 class="card-title mb-0">17,583</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class=" col-xl-3 col-lg-3 col-md-3 col-6">
                        <div class="card-body">
                          <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                            {/* <i class="mdi mdi-target text-primary mr-0 mr-sm-4 icon-lg"></i> */}
                            <i class="fas fa-bullseye text-primary mr-0 mr-sm-4 icon-lg"></i>
                            <div class="wrapper text-center text-sm-left">
                              <p class="card-text mb-0">Total Sales</p>
                              <div class="fluid-container">
                                <h3 class="card-title mb-0">61,119</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div class="row">
                <div class="col-md-4 col-sm-6 grid-margin stretch-card">
                  <div class="card text-center">
                    <div class="card-body">
                      <img src={require("../Assets/images/pic.jpg")} class="img-lg rounded-circle mb-2" alt="profile image" />
                      <h4>Maria Johnson</h4>
                      <p class="text-muted">Developer</p>
                      <p class="mt-4 card-text">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                        Aenean commodo ligula eget dolor. Lorem
									</p>
                      <button class="btn btn-primary btn-sm mt-3 mb-4">Follow</button>
                      <div class="border-top pt-3">
                        <div class="row">
                          <div class="col-4">
                            <h6>5896</h6>
                            <p>Post</p>
                          </div>
                          <div class="col-4">
                            <h6>1596</h6>
                            <p>Followers</p>
                          </div>
                          <div class="col-4">
                            <h6>7896</h6>
                            <p>Likes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              

              <div class="col-md-4 col-sm-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body pb-0">
                  <div class="wrapper border-bottom">
                    <h5 class="mb-0 text-gray">Top Products</h5>
                    <h1 class="mb-0">598,486</h1>
                    <p class="mb-4">6.5% change from today</p>
                  </div>
                  <div class="pt-4 wrapper">
                    <h5 class="mb-0 text-gray">Support Cases</h5>
                    <h1 class="mb-0">323,360</h1>
                    <p>2.5% change from yesterday</p>
                  </div>
                </div>
                </div>
                </div>
                </div>
                <canvas id="lineChart"></canvas>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default registration;
