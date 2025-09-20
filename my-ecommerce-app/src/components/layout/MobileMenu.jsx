import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";

const MobileMenu = ({ isOpen, onClose }) => {
    const { navigations } = useNavStore(); // স্টোর থেকে নেভিগেশন আনুন
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        >
            <div
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 translate-x-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-green-700">Afritabs</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-4 text-gray-700">
                    {navigations.map((item) => (
                        <Link
                            key={item._id}
                            to={item.link}
                            onClick={onClose}
                            className="hover:text-green-600"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;