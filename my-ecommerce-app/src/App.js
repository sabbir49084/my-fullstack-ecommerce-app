import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import ChatButton from "./components/common/ChatButton";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { CartProvider } from "./contexts/CartContext";

// src/App.js

function App() {
  return (
    <CartProvider> {/* CartProvider দিয়ে Wrap করুন */}
      <Navbar />
      <AppRoutes />
      <ChatButton />
      <Footer />
      <Sidebar />
    </CartProvider>
  );
}

export default App;