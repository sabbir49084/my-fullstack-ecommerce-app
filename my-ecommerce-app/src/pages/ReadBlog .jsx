import "./ReadBlog.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Alert, Button, Container, IconButton, Snackbar, TextField
} from "@mui/material";
import {
  FaCalendarAlt, FaUser, FaTag, FaArrowLeft,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram,
  FaBookmark, FaHeart
} from 'react-icons/fa';

const ReadBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });

  const fetchBlogData = () => {
    fetch(`http://localhost:4000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  };

  const fetchComments = () => {
    fetch(`http://localhost:4000/api/comments/${id}`)
      .then(res => res.json())
      .then(data => {
        // Only show approved comments on the frontend
        const approvedComments = data.filter(comment => comment.isApproved);
        setComments(approvedComments);
      })
      .catch(err => console.error("Error fetching comments:", err));
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    let shareMessage = `Check out this blog post: ${blog.title}`;
    
    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (navigator.share) {
      navigator.share({ title: blog.title, text: blog.excerpt, url: shareUrl })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      window.open(shareLink, '_blank');
    }
    
    setSnackbar({ open: true, message: `Sharing via ${platform}`, severity: 'info' });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setSnackbar({
      open: true,
      message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
      severity: 'success'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setSnackbar({
      open: true,
      message: isLiked ? 'Removed from likes' : 'Added to likes',
      severity: 'success'
    });
  };

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = () => {
    if (newComment.name && newComment.text) {
      const commentData = {
        name: newComment.name,
        text: newComment.text,
        blogId: id,
        createdAt: new Date(),
        isApproved: false, // Default to false, admin will approve
        reply: ""
      };

      fetch('http://localhost:4000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewComment({ name: "", text: "" });
          setSnackbar({ open: true, message: 'Comment submitted for approval!', severity: 'success' });
        } else {
          setSnackbar({ open: true, message: 'Failed to submit comment.', severity: 'error' });
        }
      })
      .catch(err => {
        console.error("Error submitting comment:", err);
        setSnackbar({ open: true, message: 'Failed to submit comment.', severity: 'error' });
      });
    } else {
      setSnackbar({ open: true, message: 'Please enter both name and comment.', severity: 'warning' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-800">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Blog Post Not Found</h2>
          <Link to="/blog" className="text-green-600 hover:text-green-800 flex items-center justify-center">
            <FaArrowLeft className="mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <Container maxWidth="lg">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-300">
            <FaArrowLeft className="mr-2" /> Back to Blog
          </Link>
        </div>

        {/* Blog Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">{blog.title}</h1>
            <p className="text-xl text-gray-700 mb-6">{blog.excerpt}</p>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <FaUser className="mr-2 text-green-600" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaCalendarAlt className="mr-2 text-green-600" />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaTag className="mr-2 text-green-600" />
                <span>{blog.tags?.join(", ")}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
              <div className="flex items-center space-x-4">
                <button onClick={handleLike} className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-300`}>
                  <FaHeart className="mr-1" />
                  <span>{isLiked ? 1 : 0}</span>
                </button>
                <button onClick={handleBookmark} className={`flex items-center ${isBookmarked ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-600 transition-colors duration-300`}>
                  <FaBookmark className="mr-1" />
                  <span>Save</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Share:</span>
                <IconButton onClick={() => handleShare('facebook')} size="small"><FaFacebook className="text-blue-600" /></IconButton>
                <IconButton onClick={() => handleShare('twitter')} size="small"><FaTwitter className="text-blue-400" /></IconButton>
                <IconButton onClick={() => handleShare('linkedin')} size="small"><FaLinkedin className="text-blue-700" /></IconButton>
                <IconButton onClick={() => handleShare('instagram')} size="small"><FaInstagram className="text-pink-600" /></IconButton>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
          <TextField
            label="Your Name"
            name="name"
            value={newComment.name}
            onChange={handleCommentChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Comment"
            name="text"
            value={newComment.text}
            onChange={handleCommentChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit} className="mt-3">
            Submit Comment
          </Button>

          {/* Comment List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Comments:</h3>
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet.</p>
            ) : (
              comments.map((c, index) => (
                <div key={index} className="border-b border-gray-200 pb-2 mb-2">
                  <p className="font-bold">{c.name}</p>
                  <p>{c.text}</p>
                  {c.reply && (
                      <p className="mt-2 text-gray-500 italic">Reply from Admin: {c.reply}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default ReadBlog;