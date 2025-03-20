const express = require("express");
const multer = require("multer");
const FormSubmission = require("../models/FormSubmission");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Form Submission Route
router.post("/submit", upload.single("file"), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newSubmission = new FormSubmission({ name, email, message, fileUrl });
    await newSubmission.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await FormSubmission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
