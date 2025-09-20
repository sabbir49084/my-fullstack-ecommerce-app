import React from "react";
import useNavigation from "../../hooks/useNavigation";

const Navbar = () => {
  const { navLinks, loading, error } = useNavigation();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading nav links</p>;

  return (
    <nav className="space-x-4">
      {Array.isArray(navLinks) &&
        navLinks.map((link) => (
          <a
            key={link.id}
            href={link.path}
            className="text-blue-600 hover:underline"
          >
            {link.label}
          </a>
        ))}
    </nav>
  );
};

export default Navbar;
