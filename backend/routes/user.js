const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { createResult } = require("../controller/createResult");
const { createAdmitCard } = require("../controller/createAdmitCard");
const { getUser } = require("../controller/getUsers");
const { getAdmitCard } = require("../controller/getAdmitCard");
const { getResultsCard } = require("../controller/getResultsCard");
const Job = require("../models/User");

router.post("/createUser", createUser);
router.post("/createResult", createResult);
router.post("/createAdmitCard", createAdmitCard);

router.get("/getAdmitCard", getAdmitCard);
router.get("/getResultsCard", getResultsCard);

router.get("/getallUsers", getUser);

const handleJobTitleRequest = async (req, res, next) => {
  const jobTitle = decodeURIComponent(req.params.jobTitle);
  console.log("jobTitle", jobTitle);

  try {
    // const job = await Job.findOne({ jobTitle: jobTitle }).exec();
    const job = await Job.find({ jobTitle: jobTitle });

    if (job) {
      res.json({ data: job });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error fetching job by title:", error);
    res.status(500).json({ error: "Server error" });
  }
};

router.get("/getallUsers/:jobTitle", handleJobTitleRequest);
router.get("/getResultsCard/:jobTitle", handleJobTitleRequest);
router.get("/getAdmitCard/:jobTitle", handleJobTitleRequest);

module.exports = router;
