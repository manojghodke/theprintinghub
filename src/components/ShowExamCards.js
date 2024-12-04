import React, { useState, useEffect } from "react";
import "./ShowJobs.css";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url";
import JobCard from "./JobCard";
function ShowExamCards({ type }) {
  const [exams, setExams] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getExam`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setExams(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  function formatDate(dateString) {
    // Use 'en-GB' for DD/MM/YYYY format
    const formatter = new Intl.DateTimeFormat("en-GB");
    return formatter.format(new Date(dateString));
  }
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {exams.length > 0 ? (
        <div className="jobs-grid">
          {[...exams].reverse().map((exam, index) => {
            // const imageUrl = job.file
            //   ? `${BASE_URL()}/${job.file}`
            //   : "img/simple.png";

            return (
              // <div key={index} className="job-item">
              //   <div className="job-content">
              //     <img
              //       style={{ height: "3rem" }}
              //       src={imageUrl}
              //       alt={job.jobTitle}
              //       className="job-image img-style"
              //     />
              //     <div className="job-details">
              //       <div className="job-title">
              //         <Link to={`/AdmitCard/${job.jobTitle}`}>
              //           {job.jobTitle}
              //         </Link>
              //       </div>
              //       {/*
              //       <p>
              //         <strong>Vacancies:</strong> {job.vacancy}
              //       </p>
              //       <p>
              //         <strong>Date:</strong> {formatDate(job.date)}
              //       </p> */}
              //     </div>
              //   </div>
              // </div>
              <JobCard job={exam} type={type} index={index} />
            );
          })}
        </div>
      ) : (
        <div>No jobs available</div>
      )}
    </div>
  );
}

export default ShowExamCards;
