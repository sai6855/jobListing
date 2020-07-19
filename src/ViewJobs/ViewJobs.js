import React, { useState, useEffect, Fragment } from "react";
import "./ViewJobs.css";

const ViewJobs = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [allApplicants, setAllApplicants] = useState([]);

  useEffect(() => {
    setAvailableJobs(JSON.parse(localStorage.getItem("JobsData")));
  });
  return (
    <div className="view-jobs">
      

      { availableJobs===null || availableJobs.length===0 ? <h1>No Jobs Available...</h1>:(<Fragment>
        <h1>Jobs Available</h1>
        {availableJobs.map((job) => {
        return (
          <div className="job-item">
            <h3 className="job-detail">Name:{job.name}</h3>
            <h4 className="job-detail">
              Technologies : {" "}
              {job.technologies.map((technology) => {
                return technology.label 
              })}
            </h4>
            <strong className="job-detail">
              No of Applied candidates: {job.noOfAppliedCandidates.length} 
            </strong>

            <h5 className="job-detail">
              No of eligible candidates: {job.noOfEligibleCandidates.length} (Click to know more details) 
            </h5>

          </div>
        );
      })}

      </Fragment>)}

          </div>
  );
};

export default ViewJobs;
