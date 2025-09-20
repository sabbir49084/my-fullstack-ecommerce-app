import LogoForm from "../components/forms/logoform";
import NavbarForm from "../components/forms/NavbarForm";
import { useEffect, useState } from "react";
import { addNav, deleteNav, getNavs as getAllNavs, updateNav, uploadLogo } from "../services/navService";
import { useNavStore } from "../store/useNavStore";

// --- START OF FILE NavigationManager.jsx ---

const NavigationManager = () => {
  const { navigations, setNavs, logo, setLogo, deleteNav: deleteNavInStore } = useNavStore();
  const [selected, setSelected] = useState(null);
  const [showNavModal, setShowNavModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  // ✅ fetchNavs ফাংশনকে বাইরে এনেছি
  const fetchNavs = async () => {
    try {
      const data = await getAllNavs();
      const navItems = data.filter((item) => item && !item.isLogo);
      const logoItem = data.find((item) => item && item.isLogo) || null;
      setNavs(navItems, logoItem);
    } catch (error) {
      console.error("Error loading nav links:", error);
    }
  };

  useEffect(() => {
    fetchNavs();
  }, [setNavs]);

  const handleEdit = (nav) => {
    setSelected(nav);
    setShowNavModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNav(id);
      deleteNavInStore(id);
    } catch (error) {
      console.error("Error deleting nav:", error);
    }
  };

  const handleDeleteLogo = async (id) => {
    try {
      await deleteNav(id);
      setLogo(null);
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Navigation Manager</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setSelected(null);
              setShowNavModal(true);
            }}
          >
            Add Navigation
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowLogoModal(true)}
          >
            Manage Logo
          </button>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white shadow rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Logo</h3>
        {logo ? (
          <div className="flex items-center space-x-4 p-2 bg-gray-100 rounded">
            <img
              src={logo?.logoUrl || ""}
              alt="Website Logo"
              className="h-16 w-auto"
            />
            <button
              onClick={() => handleDeleteLogo(logo._id)}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete Logo
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No logo uploaded.</p>
        )}
      </div>

      {/* Navigation List Section */}
      <div className="bg-white shadow rounded-md p-4">
        <h3 className="text-lg font-semibold mb-2">Navigations</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Title</th>
              <th className="p-2">Link</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {navigations && navigations.length > 0 ? (
              navigations
                .filter((nav) => nav)
                .map((nav) => (
                  <tr key={nav?._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{nav?.title || "No Title"}</td>
                    <td className="p-2">{nav?.link || "#"}</td>
                    <td className="p-2 space-x-2">
                      <button
                        className="text-sm bg-yellow-400 text-black px-2 py-1 rounded"
                        onClick={() => handleEdit(nav)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(nav?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  কোনো নেভিগেশন লিঙ্ক এখনও যোগ করা হয়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ এখানে refreshNavs পাঠানো হলো */}
      {showNavModal && (
        <NavbarForm
          closeModal={() => setShowNavModal(false)}
          defaultData={selected}
          refreshNavs={fetchNavs}
        />
      )}

      {showLogoModal && <LogoForm closeModal={() => setShowLogoModal(false)} />}
    </div>
  );
};

export default NavigationManager;
