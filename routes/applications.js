const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Application = require("../models/Application");


const router = express.Router();

// Multer Setup (For handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload files to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image", folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

// 📝 Submit Application
router.post(
  "/apply",
  upload.fields([
    { name: "profilePic" },
    { name: "idProof" },
    { name: "selfie" },
    { name: "frontBodyPic" },
    { name: "backBodyPic" },
    { name: "chestStomach" },
    { name: "genitals" },
    { name: "assPic" },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        dob,
        gender,
        weight,
        height,
        ethnicity,
        bodyType,
        eyeColor,
        hairColor,
        sexualOrientation,
        experience,
        workSamples,
        socialMedia,
      } = req.body;

      const uploadedFiles = {};
      const fileFields = [
        "profilePic",
        "idProof",
        "selfie",
        "frontBodyPic",
        "backBodyPic",
        "chestStomach",
        "genitals",
        "assPic",
      ];

      // Upload each file to Cloudinary
      for (const field of fileFields) {
        if (req.files[field]) {
          uploadedFiles[field] = await uploadToCloudinary(
            req.files[field][0].buffer,
            `pmta/${field}`
          );
        }
      }

      // Save the application to MongoDB
      const application = new Application({
        name,
        email,
        phone,
        dob,
        gender,
        weight,
        height,
        ethnicity,
        bodyType,
        eyeColor,
        hairColor,
        sexualOrientation,
        experience,
        workSamples,
        socialMedia,
        ...uploadedFiles, // Spread uploaded file URLs
      });

      await application.save();
      res
        .status(201)
        .json({ message: "Application submitted successfully", application });
        
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong", details: error.message });
    }
  }
);

module.exports = router;

