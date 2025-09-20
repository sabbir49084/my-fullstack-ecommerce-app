const Cart = require("../models/Cart");

// ✅ Get cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ products: [] });
    await cart.populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// ✅ Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ products: [] });

    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// ✅ Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    await cart.populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
};
