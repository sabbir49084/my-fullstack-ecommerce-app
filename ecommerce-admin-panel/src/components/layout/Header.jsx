import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { FaBell, FaCog, FaSearch, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// src/components/admin/Header.jsx

const Header = () => {
  const [search, setSearch] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [unreadCommentCount, setUnreadCommentCount] = useState(0);
  const [commentNotifications, setCommentNotifications] = useState([]);

  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchNewComments = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/comments/new");
        const data = await response.json();
        const newComments = data.map((comment) => ({
          id: comment._id,
          text: `New comment on blog: "${comment.blogTitle}" by ${comment.name}`,
          time: new Date(comment.createdAt).toLocaleString(),
          blogId: comment.blogId,
        }));
        setCommentNotifications(newComments);
        setUnreadCommentCount(newComments.length);
      } catch (error) {
        console.error("Error fetching new comments:", error);
      }
    };

    fetchNewComments();
    const intervalId = setInterval(fetchNewComments, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-40 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">Ecom Admin</h1>
      </div>

      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-200">
            <FaSearch />
          </span>
          <input type="search" className="w-full py-2 pl-10 pr-4 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow"
            placeholder="Search anything..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative" ref={notificationDropdownRef}>
          <button className="relative hover:text-yellow-300 transition duration-300"
            onClick={() => { setIsNotificationDropdownOpen(!isNotificationDropdownOpen); setIsUserDropdownOpen(false); }}>
            <FaBell size={22} />
            {unreadCommentCount > 0 && (
              <>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{unreadCommentCount}</span>
                </span>
              </>
            )}
          </button>
        </div>

        <div className="relative" ref={userDropdownRef}>
          <button className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300"
            onClick={() => { setIsUserDropdownOpen(!isUserDropdownOpen); setIsNotificationDropdownOpen(false); }}>
            <FaUserCircle size={28} />
            <span className="hidden sm:block font-medium">{user?.name || "Guest"}</span>
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-gray-800 font-medium">{user?.name || "No Name"}</p>
                <p className="text-sm text-gray-500">{user?.email || "No Email"}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                <FaUser className="mr-2 text-gray-500" /> Profile
              </button>
              <button onClick={() => navigate("/admin/settings")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                <FaCog className="mr-2 text-gray-500" /> Settings
              </button>
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                <FaSignOutAlt className="mr-2 text-gray-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
