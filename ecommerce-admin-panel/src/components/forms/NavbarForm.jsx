import React, { useState } from "react";
import { addNav, updateNav } from "../../services/navService";
import { useNavStore } from "../../store/useNavStore";

// --- START OF FILE NavbarForm.jsx ---

const NavbarForm = ({ closeModal, defaultData, refreshNavs }) => {
  const { addNav: addNavInStore, updateNav: updateNavInStore } = useNavStore();
  const [form, setForm] = useState({
    title: defaultData?.title || "",
    link: defaultData?.link || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (defaultData) {
        // ✅ আপডেট করার সময়
        result = await updateNav(defaultData._id, form);
        if (result) {
          updateNavInStore(result);
        }
      } else {
        // ✅ নতুন নেভিগেশন যোগ করার সময়
        result = await addNav(form); // <-- createNav -> addNav
        if (result) {
          addNavInStore(result);
        }
      }

      // ✅ সফল হলে রিফ্রেশ কল
      if (refreshNavs) {
        await refreshNavs();
      }

      closeModal();
    } catch (error) {
      console.error("Error saving navigation:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-bold mb-4">
          {defaultData ? "Edit Navigation" : "Add Navigation"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {defaultData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavbarForm;
