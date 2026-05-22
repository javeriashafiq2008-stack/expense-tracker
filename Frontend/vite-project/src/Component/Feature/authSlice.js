import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Services/api/axios.js";

/* =========================
   REGISTER THUNK
========================= */
export const userRegister = createAsyncThunk(
  "/register",
  async (data, thunkApi) => {
    try {
      const response = await api.post("/register", data);

      console.log("Register Response:", response);

      return response.data.data;
    } catch (error) {
      console.log("Register Error:", error);

      return thunkApi.rejectWithValue(
        error.message || "Register failed"
      );
    }
  }
);

/* =========================
   LOGIN THUNK
========================= */
export const userLogin = createAsyncThunk(
  "/login",
  async (credentials, thunkApi) => {
    try {
      const response = await api.post("/login", credentials);

      console.log("Login Response:", response);

      return response.data.data;
    } catch (error) {
      console.log("Login Error:", error);

      const apiMessage = error.response?.data?.message;
      return thunkApi.rejectWithValue(
        apiMessage || error.message || "Login failed"
      );
    }
  }
);

/* =========================
   INITIAL STATE (CLEAN)
========================= */
let initialState = {
  loading: false,
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

/* =========================
   AUTH SLICE
========================= */
const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* =========================
       REGISTER
    ========================= */
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(userRegister.rejected, (state) => {
      state.loading = false;
    });

    /* =========================
       LOGIN
    ========================= */
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });
  },
});

export const { logout, clearAuthError } = authenticationSlice.actions;
export default authenticationSlice.reducer;