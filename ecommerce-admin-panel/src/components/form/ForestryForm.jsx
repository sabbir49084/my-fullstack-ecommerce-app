import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const serviceTypes = ["Forestry Service", "Poultry Service", "Egg Service"];

const ForestryForm = ({ onSubmit, onCancel, editData }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    keyword: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type || "",
        title: editData.title || "",
        description: editData.description || "",
        keyword: editData.keyword || "",
        image: null,
      });
      setPreview(editData.image || null);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("type", formData.type);
    data.append("title", formData.title);
    data.append("description", formData.description); // এখানে HTML format save হবে
    data.append("keyword", formData.keyword);
    if (formData.image) {
      data.append("image", formData.image);
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-green-700 text-center">
        {editData ? "Update Service" : "Add New Service"}
      </h2>

      {/* Service Type */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Service Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Type</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter service title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3 font-bold italic tracking-wide focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Description (React Quill Rich Text Editor) */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Description
        </label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleQuillChange}
          className="bg-white rounded-lg"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "align",
            "list",
            "bullet",
            "link",
            "image",
          ]}
        />
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Keywords
        </label>
        <input
          type="text"
          name="keyword"
          placeholder="e.g., forest, organic, eco-friendly"
          value={formData.keyword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 italic text-gray-700 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Service Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-40 rounded-lg shadow-md object-cover"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
        >
          {editData ? "Update Service" : "Add Service"}
        </button>
      </div>
    </form>
  );
};

export default ForestryForm;
