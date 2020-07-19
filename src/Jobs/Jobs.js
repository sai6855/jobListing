import React, { useState, useEffect } from "react";
import "./Jobs.css";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const Jobs = () => {
  const [jobData, setJobData] = useState({
    name: "",
    description: "",
    technologies: [],
    id: "",
    noOfAppliedCandidates:[],
    noOfEligibleCandidates:[]
  });
  const { name, description, technologies } = jobData;

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
    ,
  ];

  const handleChange = (options) =>
    setJobData((state) => {
      return { ...state, technologies: options };
    });

  const handleNameAndDesc = (e) =>
    setJobData({ ...jobData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    const previousJobs = JSON.parse(localStorage.getItem("JobsData")) || [];
    jobData.id = uuidv4();
    const newJobs = [...previousJobs, jobData];
    localStorage.setItem("JobsData", JSON.stringify(newJobs));
    setJobData({
      name: "",
    description: "",
    technologies: [],
    id: "",
    noOfAppliedCandidates:[],
    noOfEligibleCandidates:[]
    })
    
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h1 className="job-text jobs">Create Job</h1>
        <input
          className="jobs border"
          type="text"
          placeholder="Job Title"
          name="name"
          value={name}
          onChange={handleNameAndDesc}
          required
        ></input>
        <textarea
          rows="4"
          cols="50"
          className="jobs border"
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleNameAndDesc}
          
        ></textarea>
        <Select
          required
          className="jobs"
          isMulti
          name="technologies"
          options={technologiesData}
          onChange={handleChange}
          value={technologies}
        />
        <input type="submit" className="jobs button"  name='Save Job'/>
      </form>
    </div>
  );
};

export default Jobs;
