import React, { useState } from "react";
import { uploadLogo } from "../../services/navService";
import { useNavStore } from "../../store/useNavStore";

// --- START OF FILE LogoForm.jsx ---

const LogoForm = ({ closeModal, refreshNavs }) => {
  const { setLogo } = useNavStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    try {
      const updatedLogo = await uploadLogo(selectedFile);
      if (updatedLogo) {
        setLogo(updatedLogo); // ✅ স্টোরে লোগো আপডেট
      }

      // ✅ সফল হলে রিফ্রেশ কল
      if (refreshNavs) {
        await refreshNavs();
      }

      closeModal();
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-bold mb-4">Upload Logo</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Logo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogoForm;
