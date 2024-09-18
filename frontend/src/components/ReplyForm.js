import React, { useState } from "react";
import "./ReplyForm.css";

const ReplyForm = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ comment, name, email, saveInfo });
  };

  return (
    <div className="reply-form-container">
      <h2>LEAVE A REPLY</h2>
      <p>Your email address will not be published.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="reply-form-comment"
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="reply-form-row">
          <input
            type="text"
            className="reply-form-input"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="reply-form-input"
            placeholder="Your Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="reply-form-checkbox">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
          />
          <label>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button type="submit" className="reply-form-button">
          POST COMMENT
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;
