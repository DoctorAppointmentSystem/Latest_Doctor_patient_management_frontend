import axiosInstance from './axiosInstance';

// Backend is on Port 3000 (via axiosInstance), NOT 5000
export const bulkTranslate = (texts) => axiosInstance.post('/translation/bulk', { texts });
export const updateTranslation = (english, urdu) => axiosInstance.post('/translation/update', { english, urdu });
