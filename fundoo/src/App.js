import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import './new.scss'
import './App.css';
import LoginPage from './pages/loginPage';
// import card from './components/card';
import serviceCard from './components/serviceCardComponent';
import Register from './pages/registerPage';
import ForgotPassword from './pages/forgotPasswordPage';
import Dashboard from './pages/dashboardPage';
import CreateNotesComponent from './components/createNotesComponent'
import GetAllNoteComponent from './components/getAllNoteComponent';
import ColorPaletteComponent from './components/colorPaletteComponent';
import GetReminderPage from './pages/getReminderPage';
import GetTrashPage from './pages/getTrashPage';
import GetArchivePage from './pages/getArchivePage';
import EditorPage from './pages/editorPage';
import shopingCartPage from './pages/shopingCartPage';
import labelPage from './pages/labelPage'

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
      <Route path="/reminder" component={GetReminderPage}></Route>
      <Route path="/trash" component={GetTrashPage}></Route>
      <Route path="/archive" component={GetArchivePage}></Route>
      <Route path="/editor" component={EditorPage}></Route>
      <Route path="/labels" component={labelPage}></Route>
      <Route path="/shopingCart" component={shopingCartPage}></Route>
    </Router>
    );
  }
}

export default App;
