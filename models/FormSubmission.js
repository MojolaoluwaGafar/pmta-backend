const mongoose = require("mongoose");

const FormSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FormSubmission", FormSubmissionSchema);
