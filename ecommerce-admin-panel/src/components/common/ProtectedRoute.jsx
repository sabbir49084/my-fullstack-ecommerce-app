import useAuthStore from "../../store/useAuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = useAuthStore();

  // যদি user না থাকে → login page এ redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // যদি role mismatch করে → Access Denied দেখাও
  if (allowedRole && user.role !== allowedRole) {
    return (
      <h1 className="text-center mt-20 text-red-600 text-2xl">
        Access Denied 🚫
      </h1>
    );
  }

  // সবকিছু ঠিক থাকলে → children render করো
  return children;
};

export default ProtectedRoute;
