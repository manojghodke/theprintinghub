import React, { useState, useEffect } from "react";
import "./ShowJobs.css";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

function CustomPaginationActionsTable(prop) {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const type = prop.type;

  useEffect(() => {
    if (prop.data && prop.data.length > 0) {
      setExams(prop.data);
      setLoading(false);
    } else {
      setError("No data found.");
      setLoading(false);
    }
  }, [prop.data]);

  // Format date to 'DD/MM/YYYY'
  function formatDate(dateString) {
    if (!dateString) return "N/A";
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
    <>
      <div className="examDetails-container">
        <table>
          <thead>
            <tr>
              <th>{prop.type}</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              [...exams].reverse().map((exam, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link
                      state={{ type, exam }}
                      to={`/${prop.type}/${exam.jobTitle}`}
                    >
                      {exam.jobTitle || "N/A"}
                    </Link>
                  </td>
                  {/* {exam.jobTitle}</td> */}
                  {exam.date && <td>{formatDate(exam.date)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No exams scheduled</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomPaginationActionsTable;
