const express = require("express");
require("dotenv").config();
const path = require("path");
const dbConnect = require("./config/database");
const userRoutes = require("./routes/user");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.json());

app.use("/files", express.static("files"));
const fileupload = require("express-fileupload");

app.use(fileupload());
app.use("/api/v1", userRoutes);

// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
