import axiosInstance from "./axiosInstance";


export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};