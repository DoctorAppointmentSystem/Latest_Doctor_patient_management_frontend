import axiosInstance from "./axiosInstance";

// credentials: { email, password }
export async function login(credentials) {
  // Adjust endpoint and payload as per your backend
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
