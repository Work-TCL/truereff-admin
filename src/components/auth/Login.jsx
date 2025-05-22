import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toastMessage } from "../../Utils/toast-message";
import { getErrorMessage } from "../../Utils/common-utils";
import axiosInstance from "../../Utils/axios-api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@site.com");
  const [password, setPassword] = useState("Admin@123");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/admin/auth/login", {
        email,
        password
      });
      if (response?.status === 200) {
        toastMessage.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.data?.token);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toastMessage.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={(!email || !password)}
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-no-drop"
        >
          Login
        </button>
      </div>
    </div>
  );
}
