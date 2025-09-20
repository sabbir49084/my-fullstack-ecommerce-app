import React, { useEffect } from "react";
import { fetchMessageThread } from "../../services/messageService";
import { useMessageStore } from "../../store/useMessageStore";

const MessageThread = () => {
  const { selectedUser, messages, setMessages } = useMessageStore();

  useEffect(() => {
    if (selectedUser) {
      fetchMessageThread(selectedUser._id).then(setMessages);
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a user to view messages</div>;
  }

  return (
    <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Chat with {selectedUser.name}</h2>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-md max-w-[70%] ${
              msg.sender === "admin"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            {msg.text}
            <div className="text-xs text-right mt-1 text-gray-400">{msg.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageThread;
