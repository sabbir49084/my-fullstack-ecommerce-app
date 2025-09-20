import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [autoMessage, setAutoMessage] = useState("");
    const [isMessageLoaded, setIsMessageLoaded] = useState(false);

    useEffect(() => {
        const fetchAutoMessage = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/automessage");
                setAutoMessage(response.data.message);
                setIsMessageLoaded(true);
            } catch (error) {
                console.error("No active auto message.");
            }
        };
        fetchAutoMessage();
    }, []);

    const handleButtonClick = () => {
        setShowPopup(!showPopup);
    };

    if (!isMessageLoaded) {
        return null; // Don't show the button if there's no active message
    }

    return (
        <>
            {showPopup && (
                <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-slide-in-up">
                    <div className="p-4 border-b bg-green-600 text-white rounded-t-lg">
                        <h3 className="font-semibold">Welcome!</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-700">{autoMessage}</p>
                    </div>
                    <div className="p-4 border-t text-sm text-gray-500">
                        <p>Powered by Afritabs</p>
                    </div>
                </div>
            )}
            <button
                onClick={handleButtonClick}
                className="fixed bottom-6 right-6 bg-green-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
            >
                {/* Use a chat icon instead of WhatsApp */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.529 12.012 2 10.573 2 9c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.5 8a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />
                </svg>
            </button>
        </>
    );
};

export default ChatButton;