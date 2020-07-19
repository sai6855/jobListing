import React, { Component } from "react";
import "./App.css";
import Jobs from "./Jobs/Jobs";
import Applicants from "./Applicants/Applicants";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ViewJobs from "./ViewJobs/ViewJobs";
import EligibleCandidates from "./EligibleCandidates/EligibleCandidates";
import SearchApplicants from "./SearchJobs/SearchApplicants";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar/>
        <Switch>
       <Route exact path='/jobs' component={Jobs} ></Route>
       <Route exact path='/applicants' component={Applicants} ></Route>
       <Route exact path='/view-jobs' component={ViewJobs} ></Route>
       <Route exact path='/eligible-candidates' component={EligibleCandidates} ></Route>
       <Route exact path='/search-applicants' component={SearchApplicants} ></Route>
       </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
