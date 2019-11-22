import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom"
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import registration from './Components/registration'

class App extends Component{
  render(){
  return (
      <Router>
        <Route path="/" exact component={registration}></Route>
        <Route path="/registration" component={registration}></Route>
      </Router>
  );
}
}

export default App;
