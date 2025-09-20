import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { toast } from "react-toastify";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const { token } = useAuthStore();

    // Fetch all messages from the backend
    const fetchMessages = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // If admin routes are protected
                },
            };
            const response = await axios.get("http://localhost:4000/api/messages", config);
            if (response.data && response.data.length > 0) {
                setMessages(response.data);
                setSelectedMessage(response.data[0]); // Select the latest message by default
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages.");
        }
    };

    // Mark a message as read
    const markAsRead = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:4000/api/messages/${id}`, {}, config);
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [token]);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        if (!message.read) {
            markAsRead(message._id);
            // Optimistically update the state to show it's read
            setMessages(prevMessages => 
                prevMessages.map(msg => 
                    msg._id === message._id ? { ...msg, read: true } : msg
                )
            );
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        // This part would be for sending a reply to the user.
        // For a basic contact form, a reply mechanism might not be needed.
        // For a live chat system, you'd integrate with Socket.io here.
        if (messageInput.trim() === "") return;
        toast.info("Reply feature not implemented yet. This message won't be saved to the database.");
        setMessageInput("");
    };

    return (
        <div className="flex h-full bg-gray-100 rounded-lg shadow-xl overflow-hidden">
            {/* Left Sidebar: Message List */}
            <div className="w-1/4 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Inbox</h2>
                </div>
                <ul className="overflow-y-auto h-[calc(100%-64px)]">
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <li
                                key={msg._id}
                                onClick={() => handleSelectMessage(msg)}
                                className={`flex items-center p-4 cursor-pointer transition-all duration-200 border-l-4 ${
                                    selectedMessage?._id === msg._id
                                        ? 'bg-indigo-50 border-indigo-600'
                                        : 'hover:bg-gray-100 border-transparent'
                                }`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-semibold text-gray-800 ${!msg.read && 'text-indigo-600'}`}>{msg.name}</h3>
                                        {!msg.read && (
                                            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 truncate mt-1">
                                        **Subject:** {msg.subject}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No new messages.</div>
                    )}
                </ul>
            </div>

            {/* Right Panel: Message Details */}
            {selectedMessage ? (
                <div className="flex-1 flex flex-col bg-white">
                    {/* Message Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-800">{selectedMessage.name}</h3>
                        <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold mb-2">{selectedMessage.subject}</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {selectedMessage.message}
                            </p>
                            <p className="text-right text-xs text-gray-400 mt-4">
                                Received on: {new Date(selectedMessage.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Message Reply (for future implementation) */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="This is for a future reply feature..."
                                className="flex-1 bg-transparent border-none focus:outline-none placeholder-gray-500 text-gray-800"
                                disabled={true}
                            />
                            <button
                                type="submit"
                                onClick={handleSendMessage}
                                className="ml-3 bg-gray-300 text-white p-2 rounded-full cursor-not-allowed"
                                disabled={true}
                            >
                                <FaPaperPlane size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-100">
                    <p className="text-lg text-gray-500">Select a message to view details.</p>
                </div>
            )}
        </div>
    );
};

export default Messages;