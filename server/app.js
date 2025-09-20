const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // CORS middleware যোগ করা হয়েছে
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const productRoutes = require('./route/product');
const categoryRoutes = require('./route/category');
const navRoutes = require('./route/nav');
const blogRoutes = require('./route/blog');
const commentRoutes = require('./route/comment');
const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");
//const adminAuthRoutes = require("./route/adminAuth");
const errorHandler = require("./middleware/errorHandler");
const serviceRoutes = require("./route/serviceRoutes");
const cartRoutes = require("./route/cart");
const wishlistRoutes = require("./route/wishlist");
const reviewRoutes = require('./route/reviewRoutes');
const orderRoutes = require('./route/orderRoutes'); // 'routes' এর বদলে 'route' দিন
const messageRoutes  = require('./route/messageRoutes'); // 'routes' এর বদলে 'route' দিন
const autoMessageRoutes = require("./route/autoMessageRoutes");

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/navs', navRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//app.use("/api/admin/auth", adminAuthRoutes); // ✅ এখানে সঠিক রুট পাথটি রয়েছে
app.use("/api/services", serviceRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/messages", messageRoutes); // ✅ এই লাইনটি যোগ করুন
app.use("/api/automessage", autoMessageRoutes);

// Database connection
const connectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT || 4000;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connection is ready...');
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
.catch((err) => {
      console.error('Database connection error:', err);
});