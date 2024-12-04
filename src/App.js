import React, { useEffect } from "react";
import "./App.css";
import { MainContainer } from "./components/MainContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import LoginAdmin from "./backend/LoginAdmin";
import ProtectedRoute from "./backend/ProtectedRoute";
import { AuthProvider } from "./backend/AuthContext"; // Ensure this path is correct
import JobDetails from "./components/JobDetails";
import Notes from "./components/Notes";
import { JobUpdateMainPage } from "./components/JobUpdateMainPage";
// import { AdmitCardMainPage } from "./components/AdmitCardMainPage";
import AdmitCardMainPage from "./components/AdmitCardMainPage";
import JobAdmitCard from "./components/JobAdmitCard";
import ExamDetails from "./components/ExamDetails";
import { ResultMainPage } from "./components/ResultMainPage";
import HelpDesk from "./components/HelpDesk";
import JobResult from "./components/JobResult";
import PostDetails from "./components/PostDetails";

function App() {
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        document.body.classList.add("mobile");
      } else {
        document.body.classList.remove("mobile");
      }
    };

    // Initial check
    checkScreenSize();

    // Listen to window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          {/* <Route path="/job/:jobTitle" element={<JobDetails />} /> */}
          <Route path="/allUsers/:jobTitle" element={<PostDetails />} />
          {/* <Route path="/AdmitCard/:jobTitle" element={<JobAdmitCard />} /> */}
          <Route path="/AdmitCard/:jobTitle" element={<PostDetails />} />
          <Route path="/Result/:jobTitle" element={<PostDetails />} />
          {/* <Route path="/Result/:jobTitle" element={<JobResult />} /> */}
          <Route path="/exams" element={<ExamDetails />} />
          <Route path="/Exam/:jobTitle" element={<PostDetails />} />
          <Route path="/adminLogin" element={<LoginAdmin />} />
          <Route path="/job-updates" element={<JobUpdateMainPage />} />
          <Route path="/admit-cards" element={<AdmitCardMainPage />} />

          <Route path="/results" element={<ResultMainPage />} />
          <Route path="/help-desk" element={<HelpDesk />} />
          <Route path="/notes" element={<Notes />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
