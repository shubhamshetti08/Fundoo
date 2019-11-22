import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
// import 'bootstrap/dist/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/dashboard';
import Questionanswer from './Components/ QuestionAnswers';
import Payment from './Pages/payment'
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/questionanswer" component={Questionanswer}></Route>
      <Route path="/payment" component={Payment}></Route>
      </Switch>
    </Router>
  );
}

export default App;
