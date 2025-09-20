// src/pages/Register.jsx
const Register = () => {
  return (
    <div className="container mx-auto py-10 max-w-md">
      <h2 className="text-2xl font-bold text-green-700">Register</h2>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
