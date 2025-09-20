import React from "react";
import { Link } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";

const Sidebar = ({ isOpen, onClose }) => {
    const { navigations } = useNavStore(); // স্টোর থেকে নেভিগেশন আনুন

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            ></div>

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 border-b font-bold text-green-700 text-lg">Afritabs Sidebar</div>
                <nav className="p-4 flex flex-col gap-2 text-gray-700">
                    {navigations.map((item) => (
                        <Link
                            key={item._id}
                            to={item.link}
                            onClick={onClose}
                            className="px-3 py-2 rounded-md hover:bg-green-100 text-gray-800 hover:text-green-700 transition-all duration-300"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;