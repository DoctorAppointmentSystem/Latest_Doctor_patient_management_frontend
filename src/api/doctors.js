import axiosInstance from './axiosInstance';

// Get all active doctors
export const getDoctors = () => axiosInstance.get('/doctors');

// Create new doctor (admin only)
export const createDoctor = (data) => axiosInstance.post('/doctors', data);

// Update doctor (admin only)
export const updateDoctor = (id, data) => axiosInstance.put(`/doctors/${id}`, data);

// Delete doctor (admin only)
export const deleteDoctor = (id) => axiosInstance.delete(`/doctors/${id}`);
