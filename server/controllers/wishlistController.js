const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne().populate("products.productId");
    if (!wishlist) wishlist = await Wishlist.create({ products: [] });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne();
    if (!wishlist) wishlist = await Wishlist.create({ products: [] });

    const alreadyExists = wishlist.products.some(p => p.productId.toString() === productId);
    if (!alreadyExists) {
      wishlist.products.push({ productId });
      await wishlist.save();
    }
    await wishlist.populate("products.productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    let wishlist = await Wishlist.findOne();
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);
    await wishlist.save();
    await wishlist.populate("products.productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};
