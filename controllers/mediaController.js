const Media = require("../models/Media");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadMedia = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Files:", req.files);

    // Check if a file is uploaded
    if (!req.files || !req.files.media) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, type } = req.body;
    const file = req.files.media;

    console.log("Uploading to Cloudinary...");

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    console.log("Cloudinary Upload Result:", result);

    // Save media in MongoDB
    const media = new Media({
      title,
      url: result.secure_url,
      type,
      uploadedBy: req.user.id,
    });

    await media.save();

    res.json({
      message: "Media uploaded successfully",
      mediaUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
