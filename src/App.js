import React, { Component } from "react";
import "./App.css";
import Jobs from "./Jobs/Jobs";
import Applicants from "./Applicants/Applicants";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar/>
        <Switch>
       <Route exact path='/jobs' component={Jobs} ></Route>
       <Route exact path='/applicants' component={Applicants} ></Route>
       </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
