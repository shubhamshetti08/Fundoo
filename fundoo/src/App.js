import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import './App.css'
import LoginPage from './pages/loginPage';
import card from './components/card';
import serviceCard from './components/serviceCardComponent';
import Register from './pages/registerPage';
import ForgotPassword from './pages/forgotPasswordPage';
class App extends Component {
  render() {
    return (
    <Router>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/" exact component={serviceCard}></Route>
      <Route path="/card" component={card}></Route>
      <Route path="/servicecard" component={serviceCard}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/forgotpassword" component={ForgotPassword}></Route>
    </Router>
    );
  }
}

export default App;
