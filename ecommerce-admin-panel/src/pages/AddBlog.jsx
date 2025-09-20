import React, { useEffect, useState } from "react";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { addBlog, updateBlog } from "../services/blogService";

// AddBlog.jsx

// blogService ইম্পোর্ট করুন

const AddBlog = ({ open, onClose, onSave, editBlog, categories }) => {
  const [blog, setBlog] = useState({
    // id: Date.now(), // id এখন সার্ভার থেকে আসবে (নতুন ব্লগ পোস্ট করার সময়)
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    category: "",
    tags: []
  });

  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Loading state for saving

  useEffect(() => {
    if (editBlog) {
      // MongoDB _id কে 'id' তে ম্যাপ করুন যদি প্রয়োজন হয়
      setBlog({ ...editBlog, id: editBlog._id || editBlog.id }); 
    } else {
      // যদি নতুন ব্লগ হয়, তাহলে form reset করুন
      setBlog({
        // id: Date.now(), // সার্ভার id জেনারেট করবে
        title: "",
        excerpt: "",
        content: "",
        author: "",
        date: new Date().toISOString().split('T')[0],
        image: "",
        category: "",
        tags: []
      });
    }
  }, [editBlog]);

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });
  const handleEditorChange = content => setBlog({ ...blog, content });
  const addTag = () => { 
    if (newTag && !blog.tags.includes(newTag)) { 
      setBlog({ ...blog, tags: [...blog.tags, newTag] }); 
      setNewTag(""); 
    } 
  };
  const removeTag = (tag) => setBlog({ ...blog, tags: blog.tags.filter(t => t !== tag) });

  const handleSave = async () => {
    if (!blog.title || !blog.excerpt || !blog.content) { 
      alert("Please fill in all required fields (Title, Excerpt, Content)."); 
      return; 
    }
    setIsSaving(true); // Start saving process
    try {
      if (editBlog) {
        // Update existing blog
        const updatedBlog = await updateBlog(blog.id, blog);
        onSave(updatedBlog); // Pass the actual updated blog data back
      } else {
        // Add new blog
        const newBlog = await addBlog(blog);
        onSave(newBlog); // Pass the newly created blog data back
      }
      onClose(); // Close dialog after successful save
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(`Failed to save blog: ${error.message}`);
    } finally {
      setIsSaving(false); // End saving process
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editBlog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
      <DialogContent>
        <TextField 
          fullWidth 
          label="Title" 
          name="title" 
          value={blog.title} 
          onChange={handleChange} 
          margin="normal" 
          required 
        />
        <TextField 
          fullWidth 
          label="Excerpt" 
          name="excerpt" 
          value={blog.excerpt} 
          onChange={handleChange} 
          margin="normal" 
          multiline 
          rows={3} 
          required 
        />
        <label className="block mt-2 mb-1">Content</label>
        
        {/* TinyMCE Editor Component with Table and other free plugins */}
        <Editor
          apiKey='hru60ap5pcfg049hb60ynbx8xr3lxf4wdhn7ixi27uz43h4j' // <-- Your API Key
          initialValue={editBlog ? blog.content : "<p>Type your blog content here...</p>"} // Use existing content if editing
          value={blog.content}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              'help'
            ],
            toolbar: 
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'link media table | ' + 
              'bullist numlist outdent indent | emoticons charmap | removeformat | help',
            font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva; Roboto=roboto, sans-serif; Lato=lato, sans-serif; Montserrat=montserrat, sans-serif; Open Sans=open sans, sans-serif; Poppins=poppins, sans-serif; Raleway=raleway, sans-serif; Merriweather=merriweather, serif; Ubuntu=ubuntu, sans-serif; Oswald=oswald, sans-serif; PT Sans=pt sans, sans-serif; PT Serif=pt serif, serif; Dancing Script=dancing script, cursive; Pacifico=pacifico, cursive; Indie Flower=indie flower, cursive;',
            
            // Image and Media upload settings - Note: actual upload logic needs to be handled by your backend
            images_upload_url: '/api/upload', // Make sure this endpoint exists on your server
            automatic_uploads: true,
            file_picker_types: 'image media',
            file_picker_callback: function (cb, value, meta) {
              let input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*,video/*');
              input.onchange = function () {
                let file = this.files[0];

                let reader = new FileReader();
                reader.onload = function () {
                  let id = 'blobid' + new Date().getTime();
                  let blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                  let base64 = reader.result.split(',')[1];
                  let blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }
          }}
        />
        {/* TinyMCE Editor Component End */}
        
        <TextField 
          fullWidth 
          label="Author" 
          name="author" 
          value={blog.author} 
          onChange={handleChange} 
          margin="normal" 
          required 
        />
        <TextField 
          fullWidth 
          type="date" 
          label="Date" 
          name="date" 
          value={blog.date} 
          onChange={handleChange} 
          margin="normal" 
          InputLabelProps={{ shrink: true }} 
          required
        />
        <TextField 
          fullWidth 
          label="Image URL" 
          name="image" 
          value={blog.image} 
          onChange={handleChange} 
          margin="normal" 
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={blog.category} onChange={handleChange}>
            {categories.filter(cat => cat !== "All").map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </Select>
        </FormControl>

        <div className="my-4">
          <label className="block mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <TextField 
              size="small" 
              placeholder="Add tag" 
              value={newTag} 
              onChange={(e) => setNewTag(e.target.value)} 
            />
            <Button variant="outlined" onClick={addTag} disabled={!newTag}>Add Tag</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />)}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="success" disabled={isSaving}>
          {isSaving ? "Saving..." : (editBlog ? "Update" : "Publish")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBlog;