import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Feature/authSlice.js";

export default function Sidebar({ isOpen, onClose, activeView, onNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((s) => s.auth);

  if (!token) return null;

  const name = user?.name || "User";
  const email = user?.email || "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register", { replace: true });
    onClose();
  };

  const handleNav = (view) => {
    onNavigate(view);
    onClose();
  };

  const navClass = (view) =>
    "w-full rounded-2xl px-4 py-3.5 text-left text-xs font-bold tracking-wide uppercase transition-all duration-200 " +
    (activeView === view
      ? "bg-[#0A3A2F] text-white shadow-md shadow-[#0A3A2F]/10 scale-[1.02]"
      : "text-zinc-400 hover:bg-zinc-50 hover:text-[#0A3A2F] hover:pl-5");

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <div
        role="presentation"
        onClick={onClose}
        className={
          "md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out " +
          (isOpen ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      {/* Sidebar Container */}
      <aside
        className={
          "fixed left-0 top-0 z-50 md:static md:z-auto flex h-screen md:h-auto w-64 max-w-[85vw] md:max-w-none flex-col border-r border-zinc-100 bg-[#FCFDFD] shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        {/* User Card Profile Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A3A2F] text-sm font-bold text-white shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0A3A2F]">{name}</p>
              {email && (
                <p className="truncate text-xs font-semibold text-zinc-400">{email}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="md:hidden ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-50 hover:text-zinc-800"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-1 flex-col gap-1.5 p-6">
          <button
            type="button"
            className={navClass("dashboard")}
            onClick={() => handleNav("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={navClass("add")}
            onClick={() => handleNav("add")}
          >
            Add Expense
          </button>
        </nav>

        {/* Footer Logout Button */}
        <div className="border-t border-zinc-100 p-5">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl bg-zinc-50 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A3A2F] border border-zinc-100 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
