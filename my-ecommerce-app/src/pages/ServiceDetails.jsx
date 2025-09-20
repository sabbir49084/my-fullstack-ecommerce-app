import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/services/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading service details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No service found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      {/* Image */}
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-6">
        {service.title}
      </h1>

      {/* Description (rendering HTML from Quill editor) */}
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: service.description }}
      ></div>

      {/* Keywords */}
      <p className="text-sm text-gray-500 italic">
        <span className="font-semibold text-gray-700">Keywords:</span>{" "}
        {service.keyword || "—"}
      </p>
    </div>
  );
};

export default ServiceDetails;
