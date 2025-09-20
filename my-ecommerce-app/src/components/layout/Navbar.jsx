import CartDrawer from "../common/CartDrawer";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllNavs } from "../../services/navService";
import { useNavStore } from "../../store/useNavStore";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isCartOpen, toggleCart, cartItems = [], fetchCart } = useCartStore(); 
  const { navigations, logo, setNavs } = useNavStore();
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    const fetchAllData = async () => {
      const data = await getAllNavs();
      const navItems = data.filter((item) => !item.isLogo);
      const logoItem = data.find((item) => item.isLogo);
      setNavs(navItems, logoItem);

      fetchCart();
    };
    fetchAllData();
  }, [setNavs, fetchCart]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <TopBar />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-green-800 flex items-center gap-2">
            {logo && <img src={logo.logoUrl} alt="Logo" className="h-8 w-auto" />}
            {!logo && "Afritabs"}
          </Link>

          <nav className="hidden md:flex gap-6 text-gray-700 z-30 items-center">
            {navigations.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  key={item._id}
                  to={item.link}
                  className={`relative px-2 py-1 transition-colors duration-300 ${
                    isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                  }`}
                >
                  {item.title}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-0.5 bg-green-600 transition-transform origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              );
            })}

            <button
              onClick={toggleCart}
              className="relative p-2 hover:text-green-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
                >
                  <User size={22} className="text-green-700" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <Link
                      to="/my-account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/mylist"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My List
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;