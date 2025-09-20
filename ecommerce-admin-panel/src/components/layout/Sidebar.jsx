import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

// admin/components/Sidebar.jsx
import {
    FaBoxOpen,
    FaClipboardList,
    FaCog,
    FaTachometerAlt,
    FaUsers,
    FaBlogger,
    FaBars,
    FaPlus,
    FaTree,
    FaFileInvoiceDollar,
    FaChartLine,
    FaMoneyCheckAlt,
    FaComments,
    FaExternalLinkAlt, // View Site-এর জন্য নতুন আইকন
} from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();
    const [unreadCommentCount, setUnreadCommentCount] = useState(0);

    // Function to fetch new comments count
    const fetchNewCommentCount = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/comments/new");
            const data = await response.json();
            if (Array.isArray(data)) {
                setUnreadCommentCount(data.length);
            }
        } catch (error) {
            console.error("Error fetching new comment count:", error);
        }
    };

    useEffect(() => {
        fetchNewCommentCount();
        // 30 সেকেন্ড পর পর নতুন কমেন্টের সংখ্যা আপডেট করার জন্য
        const intervalId = setInterval(fetchNewCommentCount, 30000);
        return () => clearInterval(intervalId); // কম্পোনেন্ট আনমাউন্ট হলে ইন্টার্ভাল পরিষ্কার করবে
    }, []);

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
        { name: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
        { name: "Add Product", icon: <FaPlus />, path: "/admin/add-product" },
        { name: "Orders", icon: <FaClipboardList />, path: "/admin/orders" },
        { name: "Users", icon: <FaUsers />, path: "/admin/users" },
        { name: "Blog Manager", icon: <FaBlogger />, path: "/admin/blogs" },
        { name: "Navbar Manager", icon: <FaBars />, path: "/admin/navigation" },
        { name: "SEO Manager", icon: <FaBars />, path: "/admin/seo" },
        { name: "Forestry Manager", icon: <FaTree />, path: "/admin/forestry-services" },
        { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/admin/invoicegenerator" },
        { name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
        { name: "Payment Settings", icon: <FaMoneyCheckAlt />, path: "/admin/payment-settings" },
        { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
        { name: "Messages", icon: <FiMessageSquare />, path: "/admin/messages" },
        { name: "Comments", path: "/admin/comments", icon: <FaComments /> },
        // ✅ নতুন "View Site" মেনু আইটেমটি এখানে যোগ করা হলো
        { name: "View Site", icon: <FaExternalLinkAlt />, url: "http://localhost:3001" },
    ];

    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-700">
                Afritabs Admin
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    // শর্তসাপেক্ষে `<Link>` অথবা `<a>` ট্যাগ ব্যবহার
                    if (item.url) {
                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-md text-sm transition-all duration-200 relative hover:bg-gray-800"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </a>
                        );
                    }
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-md text-sm transition-all duration-200 relative ${
                                location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                            {item.name === "Comments" && unreadCommentCount > 0 && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {unreadCommentCount}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;