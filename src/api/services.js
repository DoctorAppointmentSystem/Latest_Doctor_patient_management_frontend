import axiosInstance from './axiosInstance';

// Get all active services
export const getServices = () => axiosInstance.get('/services');

// Create new service (admin only)
export const createService = (data) => axiosInstance.post('/services', data);

// Update service (admin only)
export const updateService = (id, data) => axiosInstance.put(`/services/${id}`, data);

// Delete service (admin only)
export const deleteService = (id) => axiosInstance.delete(`/services/${id}`);
