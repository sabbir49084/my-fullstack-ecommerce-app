import AddBlog from "../pages/AddBlog";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "../services/blogService";

// src/pages/BlogManager.jsx


// Import blog service functions

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [openAddBlog, setOpenAddBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(null); // Stores the blog object to be edited
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true); // Loading state for initial fetch

  const categories = ['All', 'Forestry', 'Poultry', 'Agriculture', 'Conservation']; // Your defined categories

  // Fetch blogs from the API on component mount
  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        alert("Error loading blogs. Please check your connection or try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchAllBlogs();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handler to open the Add/Edit Blog modal
  const handleOpenAddBlog = (blogToEdit = null) => {
    setEditBlog(blogToEdit); // Set the blog to edit, or null for adding new
    setOpenAddBlog(true);
  };

  // Handler to close the Add/Edit Blog modal
  const handleCloseAddBlog = () => {
    setOpenAddBlog(false);
    setEditBlog(null); // Reset editBlog state
  };

  // Handler to delete a blog
  const handleDeleteBlog = async (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      try {
        await deleteBlog(idToDelete);
        // Optimistically update UI by removing the blog from the state
        setBlogs(blogs.filter(blog => blog._id !== idToDelete)); // Use _id from MongoDB
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Error deleting blog. Please try again.");
      }
    }
  };

  // Handler to save a blog (add new or update existing)
  const handleSaveBlog = async (blogData) => {
    try {
      if (editBlog) {
        // Update existing blog
        const updatedBlog = await updateBlog(editBlog._id, blogData); // Use _id for update
        setBlogs(blogs.map(blog => (blog._id === updatedBlog._id ? updatedBlog : blog)));
        alert("Blog updated successfully!");
      } else {
        // Add new blog
        const newBlog = await addBlog(blogData);
        setBlogs([...blogs, newBlog]); // Add the newly created blog to the state
        alert("Blog added successfully!");
      }
      handleCloseAddBlog(); // Close modal after saving
    } catch (error) {
      console.error("Failed to save blog:", error);
      alert("Error saving blog. Please check the console for details.");
    }
  };

  // Filter blogs based on search term and selected category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="xl" className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<FaPlus />} 
          onClick={() => handleOpenAddBlog()}
          sx={{ borderRadius: 2 }} // MUI styling for rounded corners
        >
          Add Blog
        </Button>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <TextField 
            size="small" 
            placeholder="Search blogs..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }} // Allow text field to grow
          />
          <FormControl size="small" sx={{ minWidth: 150, width: '100%' }}> {/* Responsive width */}
            <InputLabel>Category</InputLabel>
            <Select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              label="Category"
              sx={{ borderRadius: 2 }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <CircularProgress color="success" />
          <p className="ml-4 text-lg text-green-700">Loading blogs...</p>
        </div>
      )}

      {/* Blog list when not loading */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          No blogs found matching your criteria.
        </div>
      )}

      {!loading && filteredBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <div key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              {/* Display image if available */}
              {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover"/>
              )}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-700 font-semibold">{blog.category}</span>
                  <div className="flex gap-2">
                    <FaEdit 
                      className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors" 
                      onClick={() => handleOpenAddBlog(blog)}
                      size={20}
                    />
                    <FaTrash 
                      className="cursor-pointer text-red-600 hover:text-red-800 transition-colors" 
                      onClick={() => handleDeleteBlog(blog._id)} // Pass the MongoDB _id
                      size={20}
                    />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-green-900 mb-1">{blog.title}</h2>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Blog Modal */}
      {openAddBlog && (
        <AddBlog 
          open={openAddBlog} 
          onClose={handleCloseAddBlog} 
          onSave={handleSaveBlog} 
          editBlog={editBlog} // Pass the blog to edit, or null
          categories={categories} 
        />
      )}
    </Container>
  );
};

export default BlogManager;