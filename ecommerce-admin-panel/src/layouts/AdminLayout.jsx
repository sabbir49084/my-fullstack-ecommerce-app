import Header from "../components/layout/Header";
import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

// src/layout/AdminLayout.jsx

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Header /> {/* ✅ Changed from Navbar to Header */}
        <main className="p-6">
          <Outlet /> {/* এই জায়গায় route এর content render হবে */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
