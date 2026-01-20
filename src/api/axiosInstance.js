import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://patientmanagementsystem.duckdns.org/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // ✅ FIXED: Increased from 5s to 15s for larger requests
});

// Add interceptors for auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ FIXED: Get token from localStorage and add to Authorization header
    const tokenData = localStorage.getItem("token");

    if (tokenData) {
      try {
        // Token is stored as JSON with expiry, parse it
        const parsed = JSON.parse(tokenData);

        if (parsed && parsed.value) {
          config.headers.Authorization = `Bearer ${parsed.value}`;
        }
      } catch (e) {
        // If not JSON, use as-is (backward compatibility)
        config.headers.Authorization = `Bearer ${tokenData}`;
      }
    }

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
