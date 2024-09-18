import React, { useState, useEffect } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import "./Hero.css"; // Import CSS file for styling the Hero component
// import CardSlider from "./CardSlider";
import ShowJobs from "./ShowJobs";
import LatestNews from "./LatestNews";
import InvestmentArea from "./InvestmentArea";
import ShowAdmitCards from "./ShowAdmitCards";
import ShowExamCards from "./ShowExamCards";
import ShowResults from "./ShowResults";

const Hero = () => {
  const [selectedOption, setSelectedOption] = useState("Job Updates");

  const handleChange = (event) => {
    setSelectedOption(event.target.labels[0].innerText);
  };

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    // Load hero data from local storage on component mount
    const savedHeroData = localStorage.getItem("heroData");
    console.log(savedHeroData);
    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData));
    }
  }, []);

  return (
    <div className="main-container">
      <div className="hero">
        <Container className="text-center">
          <h1>Welcome to The Printing Hub</h1>
          <p>Your one-stop solution for all your printing needs.</p>
          <Button variant="primary" href="#learn-more">
            Learn More
          </Button>
        </Container>
        <div className="radioForm">
          <Form>
            <div className="mb-5">
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
                label="Results"
                name="group1"
                type="radio"
                id="inline-radio-4"
                checked={selectedOption === "Results"}
                onChange={handleChange}
              />
            </div>

            <div className="main-contain">
              <div className="cardCss">
                {selectedOption === "Job Updates" && <ShowJobs />}
                {selectedOption === "Admit Cards" && <ShowAdmitCards />}
                {selectedOption === "Exams" && <ShowExamCards />}
                {selectedOption === "Results" && <ShowResults />}
              </div>
            </div>
          </Form>
        </div>
        <div className="new_invest">
          {/* <LatestNews /> */}
          {/* <InvestmentArea /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
