import React, { useEffect, useState, Fragment } from "react";
import "./SearchApplicants.css";
import { technologies } from "../StaticData/Technologies";
import Select from "react-select";

const SearchApplicants = () => {
  const [applicantsData, setApplicantsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [displayApplicants, setDisplayApplicants] = useState([]);
  const [submittedDetails, setsubmittedDetails] = useState({
    id: "",
    noticePeriod: "",
    salaryAsked: "",
    technologies: [],
  });

  useEffect(() => {
    setApplicantsData(JSON.parse(localStorage.getItem("ApplicantsData")));
    setJobsData(JSON.parse(localStorage.getItem("JobsData")));
    console.log(jobsData);
  }, []);

  const handleChange = (e) =>
    setsubmittedDetails({
      ...submittedDetails,
      [e.target.name]: e.target.value,
    });
  const handleTechnologies = (options) => {
    setsubmittedDetails((state) => {
      return { ...state, technologies: options };
    });
  };

  const handleClick = () => {
    setDisplayApplicants(() => {
      let filteredApplicants = applicantsData.filter((applicant) => {

        let idCheck=true
        if(submittedDetails.id===""){
            idCheck=true
        }else if(applicant.id===submittedDetails.id){
            idCheck=true
        }else{
           idCheck= false
        }

        let salaryCheck=true
        if(submittedDetails.salaryAsked===""){
            salaryCheck=true
        }else if(applicant.salaryAsked===submittedDetails.salaryAsked){
            salaryCheck=true
        }else{
           salaryCheck= false
        }

        let noticePeriodCheck=true
        if(submittedDetails.noticePeriod===""){
            noticePeriodCheck=true
        }else if(applicant.noticePeriod===submittedDetails.noticePeriod){
            noticePeriodCheck=true
        }else{
            noticePeriodCheck= false
        }

        let technologyCheck=true;

        if( submittedDetails.technologies===null|| submittedDetails.technologies.length===0){
            technologyCheck=true
        }else {
            technologyCheck=submittedDetails.technologies.every(subTech=>{
                return applicant.technologies.find(appTech=>{
                   return appTech.label.trim()==subTech.label.trim()
                })
            })
        }

        return idCheck&&salaryCheck&&noticePeriodCheck&&technologyCheck
      });
      return [...filteredApplicants];
    });
  };

  return (
    <div className="search-applicants">
      {applicantsData === undefined || applicantsData.length === 0 ? (
        <h1>No Applicants Available</h1>
      ) : (
        <Fragment>
          <div className="box">
            <h1>Filter Applicants</h1>

            <div className="params">
              <select
                value={submittedDetails.id}
                onChange={handleChange}
                name="id"
              >
                <option value="">Select job</option>
                {jobsData.map((job) => {
                  return <option value={job.id}>{job.name}</option>;
                })}
              </select>

              <select
                name="noticePeriod"
                onChange={handleChange}
                value={submittedDetails.noticePeriod}
              >
                <option value="">Notice Period</option>
                <option value="one week">1 week</option>
                <option value="15 days">15 days</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
              </select>

              <select
                name="salaryAsked"
                onChange={handleChange}
                value={submittedDetails.salaryAsked}
              >
                <option value="">Salary Asked</option>
                <option value="2-4 Lpa">2-4 Lpa</option>
                <option value="4-8 Lpa">4-8 Lpa</option>
                <option value="10-15 Lpa">10-15 Lpa</option>
                <option value="15-20 Lpa">15-20 Lpa </option>
              </select>

              <Select
                className="tech-select"
                isMulti
                name="technologies"
                value={submittedDetails.technologies}
                options={technologies}
                onChange={handleTechnologies}
              />
            </div>
            <button className="search-button" onClick={handleClick}>
              Submit
            </button>
          </div>

          <div className="display">
            {displayApplicants !== undefined &&
              displayApplicants.length > 0 &&
              displayApplicants.map((applicant) => {
               return <div className='applicant-details'>
                   
                  <h3 className="applicant-detail">Name : {applicant.name} </h3>
                  <h4 className="applicant-detail">Notice period : {applicant.noticePeriod} </h4>
                  <h4 className="applicant-detail">Salary Asked : {applicant.salaryAsked} </h4>
              <strong className="applicant-detail">Technologies : {" "}{applicant.technologies.map(tech=>tech.label)} </strong>
                </div>;
              })}

            
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SearchApplicants;
