import axios from "axios";
import { clearLocalStorage, getAccessToken } from "./common-utils";

export const BASE_URL = process.env.REACT_APP_BACK_END_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Set token dynamically on each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // get fresh token each time
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Handle 401 token expiry globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.status === 401) {
      try {
        // Optional: refresh token logic here
        // await signOut({
        //   callbackUrl: "/login",
        //   redirect: true,
        // });
        clearLocalStorage();
        // if (typeof window !== undefined) window.location.href = "/login";
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
