import React, { useState } from "react";
import useMessageStore from "../../store/useMessageStore";

const MessageForm = () => {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const { addMessage } = useMessageStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addMessage({ userName, text });
    setUserName("");
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3"
    >
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <textarea
        placeholder="Write a message..."
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
      >
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;
