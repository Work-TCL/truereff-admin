import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toastMessage } from "../../Utils/toast-message";
import { getErrorMessage } from "../../Utils/common-utils";
import axiosInstance from "../../Utils/axios-api";
import { LoaderCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/admin/auth/login", {
        email,
        password,
      });
      if (response?.status === 200) {
        toastMessage.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.data?.token);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toastMessage.error(errorMessage);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className={`w-full border px-3 py-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full border px-3 py-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          disabled={!email || !password}
          onClick={handleLogin}
          className="w-full bg-blue-600 flex justify-center text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-no-drop"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Login"}
        </button>
      </div>
    </div>
  );
}