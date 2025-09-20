// routes/nav.js
const express = require("express");
const router = express.Router();
const navController = require("../controllers/navController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Nav CRUD routes
router.get("/", navController.getAllNavs);
router.post("/", navController.createNav);
router.put("/:id", navController.updateNav);
router.delete("/:id", navController.deleteNav);

// Logo upload
router.post("/logo", upload.single("logo"), navController.uploadLogo);

module.exports = router;
