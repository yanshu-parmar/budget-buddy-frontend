import axios from "axios";

const BASE_URL = "http://localhost:4000/api/auth";

export const authAPI = {
  signup: async (userData) => {
    return await axios.post(`${BASE_URL}/signup`, userData, {
      withCredentials: true,
    });
  },

  login: async (userData) => {
    return await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
  },

  logout: async () => {
    return await axios.post(`${BASE_URL}/logout`, null, {
      withCredentials: true,
    });
  },

  getUser: async () => {
    return await axios.get(`${BASE_URL}/me`, {
      withCredentials: true,
    });
  },
};