import { useSelector } from "react-redux";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import Spinner from "../UI/Loading.jsx";

export default function ProtectedRoute() {
  const context = useOutletContext();
  const { token, loading } = useSelector((s) => s.auth);
  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
  return token ? <Outlet context={context} /> : <Navigate to="/register" replace />;
}
