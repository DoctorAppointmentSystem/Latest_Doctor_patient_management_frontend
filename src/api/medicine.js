import axiosInstance from "./axiosInstance";


export const createMedicine = async (medicineData) => {
    try {
        const response = await axiosInstance.post('/medicines', medicineData);
        return response.data;
    }  catch (error) {
        console.error("Error creating medicine:", error);
        throw error;
    }
};

export const getMedicineById = async (medicineId) => {
    try {
        const response = await axiosInstance.get(`/medicines/${medicineId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching medicine by ID:", error);
        throw error;
    }
};

export const updateMedicine = async (medicineId, updatedData) => {
    try {
        const response = await axiosInstance.patch(`/medicines/${medicineId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating medicine:", error);
        throw error;
    }
};

export const getAllMedicines = async () => {
    try {
        const response = await axiosInstance.get('/medicines');
        return response.data;
    } catch (error) {
        console.error("Error fetching all medicines:", error);
        throw error;
    }
};      

export const deleteMedicine = async (medicineId) => {
    try {
        const response = await axiosInstance.delete(`/medicines/${medicineId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting medicine:", error);
        throw error;
    }
};

export const deleteAllMedicines = async () => {
    try {
        const response = await axiosInstance.delete('/medicines');
        return response.data;
    } catch (error) {
        console.error("Error deleting all medicines:", error);
        throw error;
    }
};