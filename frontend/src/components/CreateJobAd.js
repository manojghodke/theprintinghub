import React, { useState } from "react";
import "./createJobAd.css";

const CreateJobAd = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    vacancy: "",
    date: "",
    advPdf: null,
    applyLink: "",
    officialWebsite: "",
    adImage: null,
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
    formDataToSend.append("vacancy", formData.vacancy);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("applyLink", formData.applyLink);
    formDataToSend.append("officialWebsite", formData.officialWebsite);
    if (formData.advPdf) {
      formDataToSend.append("advPdf", formData.advPdf);
    }
    if (formData.adImage) {
      formDataToSend.append("adImage", formData.adImage);
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/createUser", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Result created successfully");
        // Reset form fields after successful submission
        setFormData({
          jobTitle: "",
          description: "",
          vacancy: "",
          date: "",
          advPdf: null,
          applyLink: "",
          officialWebsite: "",
          adImage: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  };

  return (
    <div className="create-job-ad-container">
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            className="jobTitle"
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            className="jobTitle"
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <input
          type="number"
          name="vacancy"
          placeholder="Vacancy"
          value={formData.vacancy}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
        />
        <label>
          Add Advertisement Pdf
          <input
            type="file"
            name="advPdf"
            placeholder="Advertisement PDF"
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <input
            type="file"
            name="adImage"
            placeholder="Advertisement Image"
            onChange={handleChange}
          />
        </label>
        <label>
          Apply Link
          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link"
            value={formData.applyLink}
            onChange={handleChange}
          />
        </label>
        <label>
          Official Website
          <input
            type="text"
            name="officialWebsite"
            placeholder="Official Website"
            value={formData.officialWebsite}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Job</button>
      </form>{" "}
    </div>
  );
};

export default CreateJobAd;
