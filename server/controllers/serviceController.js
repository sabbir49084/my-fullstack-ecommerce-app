const Service = require("../models/Service");
const cloudinary = require("cloudinary");

// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// ✅ Get single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// ✅ Create service
const createService = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "services",
      });
      imageUrl = result.secure_url;
    }

    const service = new Service({
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      keyword: req.body.keyword,
      image: imageUrl,
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

// ✅ Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const existingService = await Service.findById(id);
    if (!existingService) return res.status(404).json({ error: "Service not found" });

    let imageUrl = existingService.image;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "services",
      });
      imageUrl = result.secure_url;
    }

    existingService.type = req.body.type || existingService.type;
    existingService.title = req.body.title || existingService.title;
    existingService.description = req.body.description || existingService.description;
    existingService.keyword = req.body.keyword || existingService.keyword;
    existingService.image = imageUrl;

    await existingService.save();
    res.json(existingService);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service" });
  }
};

// ✅ Delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
