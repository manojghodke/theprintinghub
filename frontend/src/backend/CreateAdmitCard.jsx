import React, { useState } from "react";
import "../components/createJobAd.css";

const CreateJobAd = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    declaration: null,
    admitCardLink: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("declaration", formData.declaration);
    formDataToSend.append("admitCardLink", formData.admitCardLink);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/createAdmitCard",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Job ad created successfully");
        // Reset form fields after successful submission
        setFormData({
          jobTitle: "",
          description: "",
          declaration: null,
          admitCardLink: "",
          file: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating job ad");
    }
  };

  return (
    <div className="create-job-ad-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <label>
          Declaration:
          <input
            type="file"
            name="declaration"
            placeholder="Declaration"
            onChange={handleChange}
          />
        </label>
        <input
          type="text"
          name="admitCardLink"
          placeholder="Admit Card Link"
          value={formData.admitCardLink}
          onChange={handleChange}
        />
        <label>
          Images:
          <input type="file" name="file" onChange={handleChange} />
        </label>
        <button type="submit">Create Job Ad</button>
      </form>
    </div>
  );
};

export default CreateJobAd;
