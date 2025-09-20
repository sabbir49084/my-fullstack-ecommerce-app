import React, { useState } from "react";

export default function ReplyForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your reply..."
        rows={2}
      />
      <button type="submit" className="mt-1 px-4 py-1 text-white bg-primary rounded">Reply</button>
    </form>
  );
}
