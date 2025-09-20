import ForestryForm from "../components/form/ForestryForm";
import React, { useEffect, useState } from "react";
import useServiceStore from "../store/UseServiceStore";

// ✅ Import Service + Store
import {
  getAllServices as fetchServicesApi,
  addService,
  updateService,
  deleteService
} from "../services/ServiceService";

const ForestryManager = () => {
  const { services, setServices } = useServiceStore();
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ✅ Service Load
  const fetchServices = async () => {
  try {
    const data = await fetchServicesApi();
    setServices(data);
  } catch (err) {
    console.error("Failed to fetch services", err);
  }
};


  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Add Service
  const handleAdd = async (formData) => {
    try {
      await addService(formData);
      fetchServices();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add service", err);
    }
  };

  // ✅ Update Service
  const handleUpdate = async (formData) => {
    try {
      await updateService(editData._id, formData);
      fetchServices();
      setEditData(null);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to update service", err);
    }
  };

  // ✅ Delete Service
  const handleDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        console.error("Failed to delete service", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Service Manager</h2>
      {showForm ? (
        <ForestryForm
          onSubmit={editData ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditData(null);
          }}
          editData={editData}
        />
      ) : (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded mb-4"
          >
            Add Service
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s._id} className="border rounded p-4 shadow">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditData(s);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ForestryManager;
