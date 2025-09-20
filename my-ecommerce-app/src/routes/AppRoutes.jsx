import About from "../pages/About";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import MyAccount from "../pages/MyAccount";
import MyList from "../pages/MyList";
import NotFound from "../pages/NotFound";
import Orders from "../pages/Orders";
import ProductDetails from "../pages/ProductDetails";
import ProductZoom from "../pages/ProductZoom";
import Products from "../pages/Products";
import ReadBlog from "../pages/ReadBlog ";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";
import Services from "../pages/Services";
import SignUp from "../components/auth/SignUp";
import StripeCheckout from "../pages/StripeCheckout";
import { Route, Routes } from "react-router-dom";

// src/routes/AppRoutes.jsx


// Pages

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/product-zoom/:id" element={<ProductZoom />} />
      <Route path="/services" element={<Services />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<ReadBlog />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkout" element={<StripeCheckout  />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/about" element={<About />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path="/orders" element={<Orders />} /> {/* ✅ Add this route */}


    </Routes>
  );
};

export default AppRoutes;
