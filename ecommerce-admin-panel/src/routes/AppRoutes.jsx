import AddBlog from "../pages/AddBlog";
import AddProduct from "../pages/AddProduct";
import AdminLayout from "../layouts/AdminLayout";
import AdvancedSEOTools from "../pages/AdvancedSEOTools";
import Analytics from "../pages/Analytics";
import BlogManager from "../pages/BlogManager";
import ChatIntegration from "../pages/ChatIntegration";
import CommentManager from "../pages/CommentManager";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/EditProduct";
import ForestryManager from "../pages/ForestryManager";
import Invoices from "../pages/Invoices";
import Login from "../pages/auth/Login";
import MarketingTools from "../pages/MarketingTools";
import Messages from "../pages/Messages";
import NavigationManager from "../pages/NavigationManager";
import NotFound from "../pages/NotFound";
import OrderDetails from "../pages/OrderDetails";
import Orders from "../pages/Orders";
import PaymentSettings from "../pages/PaymentSettings";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Settings from "../pages/Settings";
import Signup from "../pages/auth/Signup";
import Users from "../pages/Users";
import { Navigate, Route, Routes } from "react-router-dom";

// ✅ OrderDetails কম্পোনেন্টটি ইম্পোর্ট করুন

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root → admin dashboard redirect */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="Admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        
        {/* ✅ এখানে নতুন রুটটি যোগ করুন */}
        <Route path="orders/:id" element={<OrderDetails />} />

        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="add-blog" element={<AddBlog />} />
        <Route path="navigation" element={<NavigationManager />} />
        <Route path="forestry-services" element={<ForestryManager />} />
        <Route path="invoicegenerator" element={<Invoices />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="chat-integration" element={<ChatIntegration />} />
        <Route path="marketing-tools" element={<MarketingTools />} />
        <Route path="payment-settings" element={<PaymentSettings />} />
        <Route path="seo" element={<AdvancedSEOTools />} />
        <Route path="messages" element={<Messages />} />
        <Route path="comments" element={<CommentManager />} />
        <Route path="*" element={<NotFound />} />
        <Route path="messages" element={<Messages />} /> {/* ✅ এই লাইনটি যোগ করুন */}

      </Route>
    </Routes>
  );
};

export default AppRoutes;