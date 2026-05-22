import { configureStore } from "@reduxjs/toolkit";
import authReducer    from "../Feature/authSlice.js";
import expenseReducer from "../Feature/expenseSlice.js";

const store = configureStore({
  reducer: {
    auth:     authReducer,
    expenses: expenseReducer,
  },
});

export default store;