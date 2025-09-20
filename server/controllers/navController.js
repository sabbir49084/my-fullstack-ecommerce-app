// controllers/navController.js
const { Nav } = require("../models/nav");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Get all navs
exports.getAllNavs = async (req, res) => {
  try {
    const navList = await Nav.find();
    res.status(200).send(navList);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving nav items", error: err.message });
  }
};

// Create new nav
exports.createNav = async (req, res) => {
  const { title, link } = req.body;

  let newNav = new Nav({ title, link, isLogo: false });
  try {
    newNav = await newNav.save();
    res.status(201).send(newNav);
  } catch (err) {
    res.status(500).send({ message: "Error adding new nav item", error: err.message });
  }
};

// Update nav
exports.updateNav = async (req, res) => {
  try {
    const navItem = await Nav.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, link: req.body.link },
      { new: true }
    );
    if (!navItem) return res.status(404).send({ message: "Nav item not found" });
    res.status(200).send(navItem);
  } catch (err) {
    res.status(500).send({ message: "Error updating nav item", error: err.message });
  }
};

// Delete nav or logo
exports.deleteNav = async (req, res) => {
  try {
    const navItem = await Nav.findById(req.params.id);
    if (!navItem) return res.status(404).send({ message: "Nav item not found" });

    if (navItem.isLogo && navItem.logoPublicId) {
      await cloudinary.uploader.destroy(navItem.logoPublicId);
    }

    await navItem.deleteOne();
    res.status(200).send({ message: "Nav item deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting nav item", error: err.message });
  }
};

// Upload or update logo
exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "logos" });
    fs.unlinkSync(req.file.path); // remove local file

    const oldLogo = await Nav.findOne({ isLogo: true });
    if (oldLogo && oldLogo.logoPublicId) {
      await cloudinary.uploader.destroy(oldLogo.logoPublicId);
      await oldLogo.deleteOne();
    }

    const newLogo = new Nav({
      title: "Logo",
      link: "/",
      isLogo: true,
      logoUrl: result.secure_url,
      logoPublicId: result.public_id,
    });
    await newLogo.save();
    res.status(200).send(newLogo);
  } catch (err) {
    res.status(500).send({ message: "Error uploading logo", error: err.message });
  }
};
