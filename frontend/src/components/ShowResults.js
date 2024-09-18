import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShowJobs.css";

function ShowResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/getResultsCard"
        );
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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {jobs.map((job, index) => {
            const imageUrl = job.adImage
              ? `http://localhost:4000/${job.adImage}`
              : "img/simple.png";

            return (
              <div key={index} className="job-item">
                <div className="job-content">
                  <img
                    style={{ height: "3rem" }}
                    src={imageUrl}
                    alt={job.jobTitle}
                    className="job-image"
                  />
                  <div className="job-details">
                    <div className="job-title">
                      <Link to={`/job/${job.jobTitle}`}>{job.jobTitle}</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No jobs available</div>
      )}
    </div>
  );
}

export default ShowResults;
