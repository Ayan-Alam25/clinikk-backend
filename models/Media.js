const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: { type: String, enum: ["video", "audio"] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Media", MediaSchema);
