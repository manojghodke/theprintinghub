import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./TextEditorForPost.css";
import { BASE_URL } from "../Url";

function TextEditorForPost({ selectedOption }) {
  const type = selectedOption;
  console.log("Selected type: " + type);

  // States for the form
  const [formData, setFormData] = useState({
    jobTitle: "",
    adImage: "",
    content: "",
  });

  // Handle input change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit form data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Dynamically construct the URL using the selected 'type'
     const apiUrl = `${BASE_URL()}/api/v1/create${type}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the formData to backend
      });

      const data = await response.json();
      if (response.ok) {
        alert("Post submitted successfully!");
        console.log("Data saved successfully:", data);
        setFormData({
          jobTitle: "",
          adImage: "",
          content: "",
        }); // Reset form after submit
      } else {
        alert(`Error: ${data.message}`);
        console.error("Error saving data:", data.message);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Job Title:
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter Job Title"
              required
            />
          </label>
        </div>

        {type !== "CurrentNew" && (
          <div className="form-group">
            <label>
              Add Image (URL):
              <input
                type="text"
                name="adImage"
                value={formData.adImage}
                onChange={handleChange}
                placeholder="Enter Image URL"
              />
            </label>
          </div>
        )}
        <div className="form-group">
          <label>Content:</label>
          <JoditEditor
            value={formData.content}
            onChange={(newContent) =>
              setFormData({ ...formData, content: newContent })
            }
            placeholder="Start typing..."
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit Post</button>
        </div>
      </form>
    </div>
  );
}

export default TextEditorForPost;
