const Media = require("../models/Media");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage before uploading to Cloudinary
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("media");

// Upload Media Controller
exports.uploadMedia = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Multer Error", error: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });

      // Save to Database
      const media = new Media({
        title: req.body.title,
        url: result.secure_url,
        type: req.body.type,
        uploadedBy: req.user.id,
      });

      await media.save();

      // Delete temp file after uploading
      fs.unlinkSync(req.file.path);

      res.json({ message: "File uploaded successfully", media });
    } catch (error) {
      res.status(500).json({ message: "Cloudinary upload error", error });
    }
  });
};


exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find({ uploadedBy: req.user.id });
    res.json({ message: "Media retrieved successfully", media });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
