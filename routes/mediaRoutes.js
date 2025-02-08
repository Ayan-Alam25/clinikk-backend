const express = require("express");
const { uploadMedia, getMedia } = require("../controllers/mediaController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// POST route for media upload
router.post("/upload", authMiddleware, uploadMedia);

// GET route for media retrieval
router.get("/my-media", authMiddleware, getMedia);

module.exports = router;
