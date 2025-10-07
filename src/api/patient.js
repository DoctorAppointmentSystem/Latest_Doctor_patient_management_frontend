import axiosInstance from "./axiosInstance";


export const getPatientsById = async (id) => {
    try {
        const response = await axiosInstance.get(`/patients/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching patient:`, error);
        throw error;
    }
};

export const updatePatientById = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/patients/${id}`, updatedData);
        return response;
    } catch (error) {
        console.error(`Error updating patient:`, error);
        throw error;
    }
};