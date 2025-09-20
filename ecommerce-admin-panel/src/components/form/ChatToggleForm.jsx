import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaComments } from "react-icons/fa";
import { toast } from "react-toastify";

const ChatToggleForm = () => {
    const [enabled, setEnabled] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    
    // Fetch current settings on load
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/automessage");
                setEnabled(response.data.enabled);
                setMessageInput(response.data.message);
            } catch (error) {
                // If no message is found, just keep defaults
                console.error("Error fetching settings:", error.response?.data.message);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:4000/api/automessage", {
                message: messageInput,
                enabled,
            });
            toast.success("Auto message settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaComments className="text-purple-600" /> Chat Integration Settings
            </h2>
            <form onSubmit={handleSave}>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-700">Enable Live Chat on Website</p>
                    <button
                        type="button"
                        onClick={() => setEnabled(!enabled)}
                        className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ${
                            enabled ? "bg-green-500" : "bg-gray-400"
                        }`}
                    >
                        <div
                            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                                enabled ? "translate-x-8" : "translate-x-0"
                            }`}
                        ></div>
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm mb-2">Auto Message Text</label>
                    <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="e.g., Hello! How can we help you today?"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default ChatToggleForm;