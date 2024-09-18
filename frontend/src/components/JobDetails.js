import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nevbar from "./Nevbar";
import "./JobDetails.css";
import ReplyForm from "./ReplyForm";
import Footer from "./Footer";

function JobDetails() {
  const { jobTitle } = useParams(); // Get the jobTitle from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobTitle) {
      setError("Invalid job title.");
      setLoading(false);
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/getAllUsers/${encodeURIComponent(
            jobTitle
          )}`
        );
        if (!response.ok) {
          throw new Error(
            "Failed to fetch job details. Please try again later."
          );
        }
        const data = await response.json();
        console.log(data);
        setJob(data.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Could not load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <div>
        <Nevbar />
      </div>
      {job && <div className="JobDetails-jobTitle">{job[0].jobTitle}</div>}
    </div>
  );
}

export default JobDetails;
