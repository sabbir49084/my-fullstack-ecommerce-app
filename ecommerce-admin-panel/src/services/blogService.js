// src/services/blogService.js

const API_URL = 'http://localhost:4000/api/blogs'; // <-- আপনার app.js এ সংজ্ঞায়িত পোর্ট ব্যবহার করা হয়েছে

// Fetch all blogs
export const getBlogs = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
};

// Fetch a single blog by id
export const getBlogById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog');
    }
    return response.json();
};

// Add a new blog
export const addBlog = async (blogData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
    });
    if (!response.ok) {
        throw new Error('Failed to add blog');
    }
    return response.json();
};

// Update an existing blog
export const updateBlog = async (id, blogData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
    });
    if (!response.ok) {
        throw new Error('Failed to update blog');
    }
    return response.json();
};

// Delete a blog
export const deleteBlog = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete blog');
    }
    return response.json();
};