const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  location: String,
  about: String,
  experience: String,
  contentType: String,
  socialMedia: String,
  imageUrls: [String], // Array to store image links
  videoUrls: [String], // Array to store video links
  date: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);
