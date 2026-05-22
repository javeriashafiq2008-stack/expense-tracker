import axios from "axios";

const API_BASE_URL = "http://localhost:3000/users";

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// REQUEST INTERCEPTOR
// =======================

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =======================
// AUTH API FUNCTIONS
// =======================

export const authApi = {
  // Register -> POST /users/register
  register: (data) => axiosInstance.post("/register", data),

  // Login -> POST /users/login
  login: (data) => axiosInstance.post("/login", data),

  // Get all users -> GET /users
  getAllUsers: () => axiosInstance.get("/"),

  // Get single user -> GET /users/:id
  getUser: (id) => axiosInstance.get(`/${id}`),

  // Add user -> POST /users
  addUser: (data) => axiosInstance.post("/", data),

  // Update user -> PUT /users/:id
  updateUser: (id, data) => axiosInstance.put(`/${id}`, data),

  // Delete user -> DELETE /users/:id
  deleteUser: (id) => axiosInstance.delete(`/${id}`),
};

export default axiosInstance;