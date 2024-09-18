import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nevbar from "./Nevbar";
import "./JobDetails.css";
import ReplyForm from "./ReplyForm";
import Footer from "./Footer";

function JobAdmitCard() {
  const { jobTitle } = useParams(); // Get the jobTitle from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/getAdmitCard/${encodeURIComponent(
            jobTitle
          )}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch admit card details. Please try again later."
          );
        }

        const data = await response.json();
        console.log(data);
        setJob(data.data || {});
      } catch (error) {
        console.error("Error fetching admit card details:", error);
        setError("Could not load admit card details. Please try again.");
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
    return <div>Admit Card not found</div>;
  }

  return (
    <div>
      <Nevbar />
      <div className="JobDetails-container">
        <div className="JobDetails-jobTitle">{job.jobTitle}</div>
        <div className="JobDetails-jobDescription">{job.description}</div>
        <div className="JobDetails-posters">Image </div>
      </div>

      <ReplyForm />
      <Footer />
    </div>
  );
}

export default JobAdmitCard;
