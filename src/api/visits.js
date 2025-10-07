import axiosInstance from "./axiosInstance";

export const createVisit = async (visitData) => {
    try {
        const response = await axiosInstance.post('/add-visits', visitData);
        return response;
    } catch (error) {
        console.error("Error creating visit:", error);
        throw error;
    }
};