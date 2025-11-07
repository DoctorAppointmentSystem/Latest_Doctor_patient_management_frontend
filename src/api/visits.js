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

export const getVisitById = async (visitId) => {
    try {
        const response = await axiosInstance.get(`/add-visits/${visitId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching visit by ID:", error);
        throw error;
    }
};

export const updateVisit = async (visitId, updatedData) => {
    try {
        const response = await axiosInstance.patch(`/add-visits/${visitId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating visit:", error);
        throw error;
    }
};

export const getAllVisits = async () => {
    try {
        const response = await axiosInstance.get('/add-visits');
        return response.data;
    } catch (error) {
        console.error("Error fetching all visits:", error);
        throw error;
    }
};

export const getVisitsByPatientId = async (patientId) => {
    try {
        const response = await axiosInstance.get(`/add-visits/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching visits by patient ID:", error);
        throw error;
    }
};