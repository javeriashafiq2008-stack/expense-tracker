import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./Component/Routes/ProtectedRoute";
import LoginPage from "./Component/Pages/login.jsx";
import RegisterPage from "./Component/Pages/resgister.jsx";
import ExpensesPage from "./Component/Pages/expensePage.jsx";

import Root from "./Component/Root.jsx"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT WRAPPER */}
        <Route element={<Root />}>

          {/* PUBLIC ROUTES */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<ExpensesPage />} />
            <Route path="/expense" element={<Navigate to="/dashboard" state={{ activeView: "add" }} replace />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/register" replace />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}