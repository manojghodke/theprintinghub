import React from "react";
import "./ShowJobs.css";
import { Link } from "react-router-dom";

function JobCard({ job, type, index }) {
  return (
    <div>
      {" "}
      <div key={index} className="job-item">
        <div className="job-content">
          <img
            style={{ height: "3rem" }}
            src={job.adImage}
            alt={job.jobTitle}
            className="job-image"
          />
          <div className="job-details">
            <div className="job-title">
              <Link state={{ type, job }} to={`/${type}/${job.jobTitle}`}>
                {job.jobTitle}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
