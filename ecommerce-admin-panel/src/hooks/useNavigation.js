import { useEffect, useState } from "react";
import { getAllNavs } from "../services/navService";

// src/hooks/useNavigation.js

const useNavigation = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllNavs()
      .then((res) => {
        setNavLinks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching nav links:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { navLinks, loading, error };
};

export default useNavigation;
