import React, { useEffect, useState, Fragment } from "react";
import Select from "react-select";
import "./Applicants.css";
import { v4 as uuidv4 } from "uuid";

const Applicants = () => {
  const [jobsData, setJobsData] = useState([]);

  const [applicantData, setApplicantData] = useState({
    id: "",
    name: "",
    notes: "",
    technologies: [],
    noticePeriod: "",
    salaryAsked: "",
    uniqueId: "",
  });

  const {
    id,
    name,
    notes,
    technologies,
    noticePeriod,
    salaryAsked,
  } = applicantData;

  const technologiesData = [
    { value: "HTML", label: "HTML " },
    { value: "CSS", label: "CSS " },
    { value: "React", label: "React " },
    { value: "Angular", label: "Angular " },
    { value: "Vue", label: "Vue " },
    { value: "Redux", label: "Redux " },
    { value: "Express", label: "Express " },
    { value: "Mongodb", label: "Mongodb " },
    { value: "SQL", label: "SQL " },
    { value: "Django", label: "Django " },
    { value: "Node", label: "Node " },
    
  ];

  useEffect(() => {
    setJobsData(JSON.parse(localStorage.getItem("JobsData")) || []);
  }, []);

  const handleClick = (e) => {
    setApplicantData({ ...applicantData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      id === "" ||
      noticePeriod === "" ||
      salaryAsked === "" ||
      technologies.length === 0
    ) {
      alert("Please enter valid data");
    } else {
      applicantData.uniqueId = uuidv4();

      jobsData.forEach((job) => {
        if (job.id === id) {
          job.noOfAppliedCandidates.push(applicantData);
        }
      });

      let isEligible = false;

      applicantData.technologies.forEach((applicantTechnology) => {
        jobsData.forEach((job) => {
          job.technologies.forEach((jobTechnology) => {
            
            if (
              applicantTechnology.value === jobTechnology.value &&
              isEligible === false &&job.id===applicantData.id
            ) {
              console.log(jobTechnology.value===applicantTechnology.value);
           
              job.noOfEligibleCandidates.push(applicantData);
              isEligible = true;
            }
          });
        });
      });

      localStorage.setItem("JobsData", JSON.stringify(jobsData));

      const previousApplicants =
        JSON.parse(localStorage.getItem("ApplicantsData")) || [];

      const newApplicants = [...previousApplicants, applicantData];
      localStorage.setItem("ApplicantsData", JSON.stringify(newApplicants));

      setApplicantData({
        id: "",
        name: "",
        notes: "",
        technologies: [],
        noticePeriod: "",
        salaryAsked: "",
      });
    }
  };

  const handleTechnologies = (options) => {
    setApplicantData((state) => {
      return { ...state, technologies: options };
    });
  };
  return (
    <div className="form-data">
      {jobsData.length === 0 ? (
        <h2>No Jobs Available</h2>
      ) : (
        <Fragment>
          <form onSubmit={handleSubmit}>
            <h1>Fill the applicant form</h1>

            <select
              required
              className="form-job"
              name="id"
              value={applicantData.id}
              onChange={handleClick}
            >
              <option value="0">Select available jobs</option>
              {jobsData.map((jobData) => {
                return (
                  <option value={jobData.id} name="id" key={jobData.id}>
                    {jobData.name}
                  </option>
                );
              })}
            </select>

            <input
              required
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              className="form-job"
              onChange={handleClick}
            />

            <textarea
              rows="4"
              cols="50"
              name="notes"
              value={notes}
              className="form-job"
              placeholder="Notes"
              onChange={handleClick}
            ></textarea>

            <Select
              required
              isMulti
              name="technologies"
              options={technologiesData}
              className="form-job"
              onChange={handleTechnologies}
              value={technologies}
            />

            <select
              required
              name="noticePeriod"
              className="form-job"
              onChange={handleClick}
              value={noticePeriod}
            >
              <option value="0">Notice Period</option>
              <option value="one week">1 week</option>
              <option value="15 days">15 days</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
            </select>

            <select
              required
              name="salaryAsked"
              className="form-job"
              onChange={handleClick}
              value={salaryAsked}
            >
              <option value="0">Salary Asked</option>
              <option value="2-4 Lpa">2-4 Lpa</option>
              <option value="4-8 Lpa">4-8 Lpa</option>
              <option value="10-15 Lpa">10-15 Lpa</option>
              <option value="15-20 Lpa">15-20 Lpa </option>
            </select>

            <input type="submit" className=" button" name="Save Application" />
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default Applicants;
