import axiosInstance from "./axios";

export const expenseApi = {
  
  // GET ALL EXPENSES
  getAll: () => axiosInstance.get("/expenses"),

  // GET SINGLE EXPENSE (NOTE: backend me abhi nahi hai but future use)
  getById: (id) => axiosInstance.get(`/expenses/${id}`),

  // CREATE EXPENSE
  create: (data) => axiosInstance.post("/expenses", data),

  // UPDATE EXPENSE
  update: (id, data) =>
    axiosInstance.put(`/expenses/${id}`, data),

  // DELETE EXPENSE
  remove: (id) =>
    axiosInstance.delete(`/expenses/${id}`),

  // GET TOTAL EXPENSE
  getTotal: () =>
    axiosInstance.get("/expenses/total"),
};