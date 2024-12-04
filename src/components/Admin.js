import React, { useState } from "react";
import CreateJobAd from "./CreateJobAd";
import Nevbar from "./Nevbar";
import { Form } from "react-bootstrap";
import CreateAdmitCard from "../backend/CreateAdmitCard";
import CreateResult from "../backend/CreateResult";
import CurrentNews from "../backend/CurrentNews";
import CreateExam from "../backend/CreateExam.js";
import "./admin.css";
import TextEditorForPost from "../backend/TextEditorForPost.js";
// import CurrentNews component if you have it
// import CurrentNews from "./CurrentNews";

export const Admin = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const label = event.target.nextSibling.textContent;
    setSelectedOption(label);
    console.log(label);
  };

  return (
    <div>
      <Nevbar />
      <div className="radioForm">
        <Form>
          <div className="mb-5 admin-option">
            <Form.Check
              inline
              label="User"
              name="group1"
              type="radio"
              id="inline-radio-1"
              checked={selectedOption === "User"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="AdmitCard"
              name="group1"
              type="radio"
              id="inline-radio-2"
              checked={selectedOption === "AdmitCard"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Exam"
              name="group1"
              type="radio"
              id="inline-radio-3"
              checked={selectedOption === "Exam"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Result"
              name="group1"
              type="radio"
              id="inline-radio-4"
              checked={selectedOption === "Result"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="CurrentNew"
              name="group1"
              type="radio"
              id="inline-radio-5"
              checked={selectedOption === "CurrentNew"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="TextEditorForPost"
              name="group1"
              type="radio"
              id="inline-radio-6"
              checked={selectedOption === "TextEditorForPost"}
              onChange={handleChange}
            />
          </div>
        </Form>
      </div>
      {/* {selectedOption === "Job Updates" && <CreateJobAd />}
      {selectedOption === "Exams" && <CreateExam />}
      {selectedOption === "Admit Cards" && <CreateAdmitCard />}
      {selectedOption === "Results" && <CreateResult />}
      {selectedOption === "CurrentNews" && <CurrentNews />}
      {selectedOption === "TextEditorForPost" && <TextEditorForPost />} */}

      <TextEditorForPost selectedOption={selectedOption} />
    </div>
  );
};

export default Admin;
