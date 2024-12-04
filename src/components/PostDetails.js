import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Nevbar from "./Nevbar";
import ReplyForm from "./ReplyForm";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import "./JobDetails.css";

function PostDetails() {
  const location = useLocation();
  const { type, job } = location.state || {};
  const [post, setPost] = useState(job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" />
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!post) {
    return <div className="no-job-message">Job not found</div>;
  }

  return (
    <div>
      <Nevbar />
      <main className="JobDetails-container">
        <h1 className="JobDetails-jobTitle">{post.jobTitle}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="JobDetails-jobContent"
        />
      </main>
      <ReplyForm />
      <Footer />
    </div>
  );
}

export default PostDetails;
