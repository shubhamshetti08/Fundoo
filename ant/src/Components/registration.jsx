import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mdiMagnify } from '@mdi/js';
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Form, Input, Icon, Tooltip, Card } from 'antd';
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
        <nav className="navbar horizontal-layout col-lg-12 col-12 p-0">
          <div className="text-center navbar-brand-wrapper d-flex align-items-top">
            <a className="navbar-brand brand-logo">
            <img  style={{ width: "170px", height: "60px" }} src={require("../Assets/images/i.svg")}></img>
            </a>
          <form className="search-field ml-auto">
      <i className="mdi mdi-magnify">
        </i>  
        <FontAwesomeIcon
    icon="envelope"
  /> 
   <FontAwesomeIcon icon={faHome} />
        <input className="form-control"></input>
          </form>
          </div>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-12-grid-margin">
                  <div className="card card-statistics">
                    <div className="row">
                      <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                            <i className="mdi mdi-account-multiple-outline text-primary mr-0 mr-sm-4 icon-lg">
                              antDesign
  </i>
                            <div className="wrapper text-center text-sm-left">
                              <p className="card-text mb-0">new user</p>
                              <div className="fluid-container">
                                <h3 className="card-title mb-0card-title mb-0">65,000</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default registration;
