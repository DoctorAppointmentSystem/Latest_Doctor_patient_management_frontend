import axiosInstance from "./axiosInstance";

export const createPatient = async (patientData) => {
    try {
        const response = await axiosInstance.post('/patients', patientData);
        return response;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

export const getAllPatients = async (category, searchQuery) => {
    if (!category || !searchQuery) {
        try {
        const response = await axiosInstance.get('/patients');
        return response;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
    } else {
         try {
        const response = await axiosInstance.get(`/patients?${category}=${searchQuery}`);
        return response;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
    }
   
};

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