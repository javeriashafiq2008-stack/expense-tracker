import axios from "axios";

// In dev, use Vite proxy (same origin). In production, hit API directly.
const API_BASE_URL = import.meta.env.DEV ? "" : "http://127.0.0.1:3000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// =================================
// REQUEST INTERCEPTOR
// Runs before request is sent
// =================================

api.interceptors.request.use(

  (config) => {

    // Get token from localStorage
    let token = localStorage.getItem("token");

    // If token exists
    if (token) {

      // Send token in headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// =================================
// RESPONSE INTERCEPTOR
// Runs after response comes
// =================================

api.interceptors.response.use(

  // If request successful
  (response) => {

    return response;
  },

  // If error comes
  (error) => {

    console.log("Error in api.js file", error);

    return Promise.reject(error);
  }
);

export default api;