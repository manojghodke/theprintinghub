import React from "react";
import CreateJobAd from "./CreateJobAd";
import Nevbar from "./Nevbar";
import { useState, useEffect } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import CreateAdmitCard from "../backend/CreateAdmitCard";
import "./admin.css";

import CreateResult from "../backend/CreateResult";

export const Admin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.labels[0].innerText);
  };
  return (
    <div>
      <Nevbar />
      <div className="radioForm  ">
        <Form>
          <div className="mb-5 admin-option">
            <Form.Check
              inline
              label="Job Updates"
              name="group1"
              type="radio"
              id="inline-radio-1"
              checked={selectedOption === "Job Updates"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Admit Cards"
              name="group1"
              type="radio"
              id="inline-radio-2"
              checked={selectedOption === "Admit Cards"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Exams"
              name="group1"
              type="radio"
              id="inline-radio-3"
              checked={selectedOption === "Exams"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Results"
              name="group1"
              type="radio"
              id="inline-radio-4"
              checked={selectedOption === "Results"}
              onChange={handleChange}
            />
          </div>
          {/* <div>Selected Option: {selectedOption}</div> */}
        </Form>
      </div>
      {selectedOption === "Job Updates" && <CreateJobAd />}
      {selectedOption === "Admit Cards" && <CreateAdmitCard />}

      {selectedOption === "Results" && <CreateResult />}
    </div>
  );
};
export default Admin;
