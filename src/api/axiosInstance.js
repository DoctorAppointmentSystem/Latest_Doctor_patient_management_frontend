import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://patientmanagementsystem.duckdns.org/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional (5 seconds)
});

// Add interceptors (optional: for auth tokens, logging, errors)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: add auth token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
