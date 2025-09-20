import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bloge = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from backend
    fetch("http://localhost:4000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-2">Author: {blog.author}</p>
              <p className="text-gray-700 text-sm mb-4">
                {blog.excerpt.length > 100
                  ? blog.excerpt.substring(0, 100) + "..."
                  : blog.excerpt}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bloge;
