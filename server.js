const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/pmta")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();
    res.json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving message" });
  }
});
const { upload } = require("./config/cloudinary");

app.post("/api/apply", upload.array("files", 10), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      gender,
      location,
      about,
      experience,
      contentType,
      socialMedia,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !gender ||
      !location ||
      !about ||
      !experience ||
      !contentType ||
      !socialMedia
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Extract uploaded files URLs
    const uploadedFiles = req.files.map((file) => file.path);
    const imageUrls = uploadedFiles.filter((url) =>
      url.match(/\.(jpeg|jpg|png|gif)$/i)
    );
    const videoUrls = uploadedFiles.filter((url) =>
      url.match(/\.(mp4|avi|mov|wmv|flv)$/i)
    );

    const newApplication = new Application({
      name,
      email,
      phone,
      age,
      gender,
      location,
      about,
      experience,
      contentType,
      socialMedia,
      imageUrls,
      videoUrls,
    });

    await newApplication.save();
    res.json({
      message: "Application submitted successfully!",
      imageUrls,
      videoUrls,
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving application" });
  }
});

app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});


app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Contact.find(); // Replace with your actual Mongoose model
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});


// Start Server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
