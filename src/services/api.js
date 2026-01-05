import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API
export const profileAPI = {
  getAll: async () => {
    const response = await api.get('/profiles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/profiles', data);
    return response.data;
  },

  updateTimezone: async (id, timezone) => {
    const response = await api.patch(`/profiles/${id}/timezone`, { timezone });
    return response.data;
  },
};

// Event API
export const eventAPI = {
  getAll: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  getByProfile: async (profileId) => {
    const response = await api.get(`/events/profile/${profileId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/events', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

// Logs API
export const logAPI = {
  getByEvent: async (eventId) => {
    const response = await api.get(`/logs/event/${eventId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/logs');
    return response.data;
  },
};

export default api;