const express = require("express");
const multer = require("multer");

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// ✅ Multer for image upload
const upload = multer({ dest: "uploads/" });

// Public routes
router.get("/", getServices);
router.get("/:id", getServiceById);

// Admin routes (add middleware later)
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

module.exports = router;
