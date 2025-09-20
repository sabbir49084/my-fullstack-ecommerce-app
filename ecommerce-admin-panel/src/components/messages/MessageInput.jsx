import React, { useState } from "react";
import { sendMessageToUser } from "../../services/messageService";
import { useMessageStore } from "../../store/useMessageStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { selectedUser, messages, setMessages } = useMessageStore();

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    const newMsg = await sendMessageToUser(selectedUser._id, text);
    setMessages([...messages, newMsg]);
    setText("");
  };

  return selectedUser ? (
    <div className="p-4 border-t bg-white dark:bg-gray-900 flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <button
        onClick={handleSend}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  ) : null;
};

export default MessageInput;
