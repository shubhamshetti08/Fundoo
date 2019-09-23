import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import './App.css';
import './App.scss'
import LoginPage from './pages/loginPage';
// import card from './components/card';
import serviceCard from './components/serviceCardComponent';
import Register from './pages/registerPage';
import ForgotPassword from './pages/forgotPasswordPage';
import Dashboard from './pages/dashboardPage';
import CreateNotesComponent from './components/createNotesComponent'
import GetAllNoteComponent from './components/getAllNoteComponent';
import ColorPaletteComponent from './components/colorPaletteComponent';
class App extends Component {
  render() {
    return (
    <Router>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/" exact component={serviceCard}></Route>
      {/* <Route path="/card" component={card}></Route> */}
      <Route path="/servicecard" component={serviceCard}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/forgotpassword" component={ForgotPassword}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/createNotes" component={CreateNotesComponent}></Route>
      <Route path="/getAllNotes" component={GetAllNoteComponent}></Route>
      <Route path="/color" component={ColorPaletteComponent}></Route>
    </Router>
    );
  }
}

export default App;
