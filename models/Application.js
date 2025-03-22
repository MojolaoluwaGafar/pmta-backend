const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: false },
  gender: { type: String, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },
  ethnicity: { type: String, required: false },
  bodyType: { type: String, required: false },
  eyeColor: { type: String, required: false },
  hairColor: { type: String, required: false },
  sexualOrientation: { type: String, required: false },
  experience: { type: String, required: false },
  workSamples: { type: String, required: false },
  socialMedia: { type: String, required: false },

  // File Uploads - Store URLs from Cloudinary or local storage
  profilePic: { type: String, required: false },
  idProof: { type: String, required: false },
  selfie: { type: String, required: false },
  frontBodyPic: { type: String, required: false },
  backBodyPic: { type: String, required: false },
  chestStomach: { type: String, required: false },
  genitals: { type: String, required: false },
  assPic: { type: String, required: false },

  submittedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
