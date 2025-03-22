const applicationRoutes = require("./routes/applications.js");
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
app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Contact.find(); // Replace with your actual Mongoose model
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/", (req, res) => {
  res.send("PMTA API is running...");
});
app.use("/api", applicationRoutes);

// Start Server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
