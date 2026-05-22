import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Services/api/axios.js";

/* =========================
   FETCH EXPENSES
========================= */
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/expenses");
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch expenses"
      );
    }
  }
);

/* =========================
   ADD EXPENSE
========================= */
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (data, thunkApi) => {
    try {
      const response = await api.post("/expenses", data);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to add expense"
      );
    }
  }
);

/* =========================
   UPDATE EXPENSE
========================= */
export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, ...data }, thunkApi) => {
    try {
      const response = await api.put(`/expenses/${id}`, data);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to update expense"
      );
    }
  }
);

/* =========================
   DELETE EXPENSE
========================= */
export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/expenses/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to delete expense"
      );
    }
  }
);

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  expenses: [],
  total: 0,
  loading: false,
  error: null,
};

/* =========================
   SLICE
========================= */
const expenseSlice = createSlice({
  name: "expenses",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    /* =========================
       FETCH
    ========================= */
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = action.payload;

      // total calculate
      state.total = action.payload.reduce(
        (sum, e) => sum + Number(e.amount),
        0
      );
    });

    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* =========================
       ADD
    ========================= */
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.expenses.unshift(action.payload);
      state.total += Number(action.payload.amount);
    });

    /* =========================
       UPDATE
    ========================= */
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      const index = state.expenses.findIndex(
        (e) => e.id === action.payload.id
      );

      if (index !== -1) {
        state.expenses[index] = action.payload;

        state.total = state.expenses.reduce(
          (sum, e) => sum + Number(e.amount),
          0
        );
      }
    });

    /* =========================
       DELETE
    ========================= */
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      const deleted = state.expenses.find(
        (e) => e.id === action.payload
      );

      if (deleted) {
        state.total -= Number(deleted.amount);
      }

      state.expenses = state.expenses.filter(
        (e) => e.id !== action.payload
      );
    });
  },
});

export const { clearError } = expenseSlice.actions;
export default expenseSlice.reducer;