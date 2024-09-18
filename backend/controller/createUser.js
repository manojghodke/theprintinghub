const User = require("../models/User");
const path = require("path");
const fs = require("fs");

exports.createUser = async (req, res) => {
  try {
    const { jobTitle, description, vacancy, date, applyLink, officialWebsite } =
      req.body;

    // Ensure files are present
    if (!req.files || !req.files.advPdf || !req.files.adImage) {
      return res.status(400).json({
        status: 400,
        message: "Both advPdf and adImage files are required",
      });
    }

    const advPdf = req.files.advPdf;
    const adImage = req.files.adImage;

    console.log("advPdf received:", advPdf);
    console.log("adImage file received:", adImage);

    // Ensure the /files directory exists
    const uploadDir = path.join(__dirname, "..", "files");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Define the file paths
    const advPdfPath = path.join(uploadDir, advPdf.name);
    const adImagePath = path.join(uploadDir, adImage.name);

    // Move the files
    await advPdf.mv(advPdfPath, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({
          status: 500,
          message: "File upload failed. Please try again.",
        });
      }
    });

    await adImage.mv(adImagePath, (err) => {
      if (err) {
        console.error("adImage file upload error:", err);
        return res.status(500).json({
          status: 500,
          message: "adImage file upload failed. Please try again.",
        });
      }
    });

    // Validate and convert inputs
    if (
      !jobTitle ||
      !description ||
      !vacancy ||
      !date ||
      !applyLink ||
      !officialWebsite
    ) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const vacancyNumber = Number(vacancy);
    const dateISO = new Date(date);

    // Validate vacancy and date
    if (isNaN(vacancyNumber)) {
      return res.status(400).json({
        status: 400,
        message: "Vacancy must be a number",
      });
    }

    if (isNaN(dateISO.getTime())) {
      return res.status(400).json({
        status: 400,
        message: "Date must be a valid date",
      });
    }

    // Create the user in the database
    const user = await User.create({
      jobTitle,
      description,
      vacancy: vacancyNumber,
      date: dateISO,
      advPdf: advPdf.name,
      applyLink,
      officialWebsite,
      adImage: adImage.name,
    });

    return res.status(201).json({
      status: 201,
      message: "Job Ad created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message:
        "Internal server error. Please check the server logs for more details.",
    });
  }
};
