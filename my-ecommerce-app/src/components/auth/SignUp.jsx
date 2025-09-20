import React, { useState } from "react";
import useAuthStore  from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { signup as signupService } from "../../services/authService";

const SignUp = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      if (isAdmin) {
        payload.role = "Admin";
        payload.adminCode = formData.adminCode;
      }

      const res = await signupService(payload);

      if (res?.success && res?.user && res?.token) {
        setUser(res.user, res.token);

        // role অনুযায়ী redirect
        if (res.user.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(res?.message || "Signup failed!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          {isAdmin ? "Admin Sign Up" : "Create Account"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            required
          />

          {isAdmin && (
            <input
              type="password"
              name="adminCode"
              placeholder="Admin Code"
              value={formData.adminCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isAdmin
              ? "Create Admin"
              : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
