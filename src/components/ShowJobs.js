import React, { useEffect, useState } from "react";

import "./ShowJobs.css";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url";
import JobCard from "./JobCard";

function ShowJobs({ type }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getallUsers`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {[...jobs].reverse().map((job, index) => {
            return (
              // <div key={index} className="job-item">
              //   <div className="job-content">
              //     <img
              //       style={{ height: "3rem" }}
              //       src={imageUrl}
              //       alt={job.jobTitle}
              //       className="job-image"
              //     />
              //     <div className="job-details">
              //       <div className="job-title">
              //         <Link
              //           // state={{ type, job }}
              //           state={job}
              //           to={`/${type}/${job.jobTitle}`}
              //         >
              //           {job.jobTitle}
              //         </Link>
              //       </div>

              //       {/* <p>
              //         <strong>Vacancies:</strong> {job.vacancy}
              //       </p>
              //       <p>
              //         <strong>Date:</strong> {formatDate(job.date)}
              //       </p> */}
              //     </div>
              //   </div>
              // </div>
              <JobCard job={job} type={type} index={index} />
            );
          })}
        </div>
      ) : (
        <div>No jobs available</div>
      )}
    </div>
  );
}

export default ShowJobs;
