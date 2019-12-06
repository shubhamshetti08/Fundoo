import React, { Component } from 'react'
import { MDBRow, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { Card, Fab, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { GET_ADMIN_DATA } from '../Constants/UserConstants'
import { getAdminUsersList } from '../Services/AdminServices';
import { withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
var theme=createMuiTheme({
    overrides:{
    MuiFab:{
        root:{
        color:"#d50000,#ffeb3b,#1b5e20,#0d47a1",
        backgroundColor:"peach-gradient"
        }
    }
    }
})
const dispatchToProps = dispatch => ({
    getUsersList: resData => dispatch({ type: GET_ADMIN_DATA, payload: resData })
});
function mapStateToProps(state) {
    return {
        userList: state.dashboardReducers.user
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
        console.log("email", this.state.email);

    };
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
        console.log("password", this.state.password);
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log("in submit");

        let data = {
            email: this.state.email,
            password: this.state.password
        };

        console.log("data before sending to action ", data);
        // this.props.login(data);
        getAdminUsersList().then(data => {
            console.log("data in login ", data.data.data.data);
            let resData = data.data.data.data;
            this.props.getUsersList(resData);
            if (this.state.email !== '' && this.state.password !== '') {
                this.props.history.push('/dashboard')
            }
        });
    };

    render() {
        return (
            <div className="login-page">
                {/* <div className="d-flex justify-content-center">
    <button type="button" className="btn btn-outline-success">Close me ya'll!</button>
  </div> */}
                <Card className="justify-content-xl-center ">
                    <div className="header pt-3 peach-gradient">
                        <MDBRow className="d-flex justify-content-center">
                            <h3 className="white-text mb-3 pt-3 font-weight-bold">
                                Log in
                            </h3>
                        </MDBRow>
                        <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                            <a className="fa-lg p-2 m-2 fb-ic" href=" ">
                                <MDBIcon fab icon="facebook-f" size="lg" className="white-text" />
                            </a>
                            <a className="fa-lg p-2 m-2 tw-ic" href=" ">
                                <MDBIcon fab className="fa-twitter white-text fa-lg" />
                            </a>
                            <a className="fa-lg p-2 m-2 gplus-ic" href=" ">
                                <MDBIcon fab className="fa-google-plus-g white-text fa-lg" />
                            </a>
                        </MDBRow>
                    </div>
                    <form className="mx-4 mt-4 was-validated" onSubmit={(event) => this.handleSubmit(event)}
                    >
                        <div className="form-group grey-text">
                            {/* <label for="email">Email address:</label> */}
                            <MDBInput
                                label="Type your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                required
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                            />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="form-group grey-text">
                            {/* <label for="password">password:</label> */}
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                required
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                            />
                        </div>
                        <div className="form-group text-center "  >
                            <MDBBtn
                                className="mb-3  peach-gradient btn"
                                type="submit"
                                value='submit'
                            // onSubmit={(event) => this.handleSubmit(event)}

                            >
                                Login
                            </MDBBtn>

                        </div>
                        <MuiThemeProvider theme={theme}>
                        <div className="pls-btn">
                            <Fab  aria-label="add" style={{background:'linear-gradient(to right bottom,#176BEF,#FF3E30,#F7B529,#179C52)'}}>
                                {/* <AddIcon className="plus" /> */}
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </Fab>
                           
                        </div>
                        </MuiThemeProvider>

                    </form>
                </Card>
            </div>
        )
    }
}
// const actionCreators = {
//     login: userActions.login
// };
// function mapState(state){
//   return {state};
// };

export default withRouter(connect(
    mapStateToProps,
    dispatchToProps,
)(LoginComponent));