const path = require("path");
const fs = require("fs");
const User = require("../models/Result");

// Controller function to create a new admit card
exports.createResult = async (req, res) => {
  try {
    // Destructure the request body
    const { jobTitle, description, resultLink } = req.body;
    const file = req.files.file;
    const declaration = req.files.declaration;

    console.log("File received:", file);
    console.log("Declaration file received:", declaration);

    // Ensure the /files directory exists
    const uploadDir = path.join(__dirname, "files");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Define the file paths
    const filePath = path.join(uploadDir, file.name);
    const declarationPath = path.join(uploadDir, declaration.name);

    // Move the files
    await file.mv(filePath, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({
          status: 500,
          message: "File upload failed. Please try again.",
        });
      }
    });

    await declaration.mv(declarationPath, (err) => {
      if (err) {
        console.error("Declaration file upload error:", err);
        return res.status(500).json({
          status: 500,
          message: "Declaration file upload failed. Please try again.",
        });
      }
    });

    // Check if all required fields are provided
    if (!jobTitle || !description || !resultLink) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    // Create a new admit card in the database
    const result = await User.create({
      jobTitle,
      description,
      declaration: declaration.name,
      resultLink,
      file: file.name,
    });

    // Respond with success message and admit card data
    return res.status(201).json({
      status: 201,
      message: "Result created successfully",
      data: result,
    });
  } catch (error) {
    // Log and respond with error message
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message:
        "Internal server error. Please check the server logs for more details.",
    });
  }
};
