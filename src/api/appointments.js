import axiosInstance from "./axiosInstance";


export const getAppointments = async () => {
    try {
        const response = await axiosInstance.get('/appointments');
        return response;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

export const getAppointmentsById = async (id) => {
    try {
        const response = await axiosInstance.get(`/appointments/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching appointment:`, error);
        throw error;
    }
};

export const getAppointmentsByPatientId = async (patientId) => {
    try {
        const response = await axiosInstance.get(`/appointments/patient/${patientId}`);
        return response;
    } catch (error) {
        console.error(`Error fetching appointments for patient ${patientId}:`, error);
        throw error;
    }
};

export const getNextToken = async () => {
    try {
        const response = await axiosInstance.get('/appointments/next-token');
        return response;
    } catch (error) {
        console.error('Error fetching next token:', error);
        throw error;
    }
};