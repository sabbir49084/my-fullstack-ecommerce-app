import React, { useState } from "react";
import { createBlog } from "../../services/blogService";
import { useBlogStore } from "../../store/useBlogStore";

// ✅ BlogForm.jsx (src/components/form/BlogForm.jsx)

const BlogForm = () => {
  const { addBlog } = useBlogStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = await createBlog({ title, content });
    addBlog(newBlog);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 border rounded h-40"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Blog
      </button>
    </form>
  );
};

export default BlogForm;
