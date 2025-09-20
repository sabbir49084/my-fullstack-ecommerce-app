import useAuthStore  from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            You are not logged in!
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          My Account
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          {user.role && (
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
