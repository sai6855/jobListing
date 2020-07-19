import React, { Fragment } from "react";
import "./EligibleCandidates.css";

const EligibleCandidates = ({ location: { details, role } }) => {
  console.log(details);

  return (
    <div className="eligible-candidates">
      {details === undefined || details.length === 0 ? (
        <h1>No eligible candidates</h1>
      ) : (
        <Fragment>
          <h1>Eligible Candidates for {role} role </h1>
          {details.map((detail, i) => {
            return (
              <div key={i} className="candidate-details">
                <h3 className="detail">Name : {detail.name}</h3>
                <h4 className="detail">
                  Notice period : {detail.noticePeriod}
                </h4>
                <h4 className="detail">Salary Asked : {detail.salaryAsked}</h4>
                <strong className="detail ">
                  Technologies : {detail.technologies.map((tech) => tech.label)}{" "}
                </strong>
              </div>
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

export default EligibleCandidates;
