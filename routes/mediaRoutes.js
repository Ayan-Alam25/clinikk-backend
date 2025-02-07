const express = require("express");
const { uploadMedia } = require("../controllers/mediaController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/upload", authMiddleware, uploadMedia);
module.exports = router;
