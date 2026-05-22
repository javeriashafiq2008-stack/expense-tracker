import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function MenuButton({ onClick, isOpen }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.2 rounded-xl border border-zinc-200 bg-zinc-50 text-[#0A3A2F] transition hover:border-[#0A3A2F]/30 hover:bg-[#0A3A2F]/5"
    >
      <span
        className={
          "block h-0.5 w-4 rounded-full bg-current transition-all duration-300 " +
          (isOpen ? "translate-y-1.5 rotate-45" : "")
        }
      />
      <span
        className={
          "block h-0.5 w-4 rounded-full bg-current transition-all duration-300 " +
          (isOpen ? "opacity-0" : "")
        }
      />
      <span
        className={
          "block h-0.5 w-4 rounded-full bg-current transition-all duration-300 " +
          (isOpen ? "-translate-y-1.5 -rotate-45" : "")
        }
      />
    </button>
  );
}

export default function Header({ activeView, sidebarOpen, setSidebarOpen }) {
  const { user, token } = useSelector((s) => s.auth);
  const location = useLocation();

  const path = location.pathname;

  const isAuth = path === "/login" || path === "/register";
  const isDashboard = path === "/dashboard" && activeView !== "add";
  const isAddExpense = path === "/expense" || path === "/add" || (path === "/dashboard" && activeView === "add");

  const getTitle = () => {
    if (isAuth) return "Air Pay";
    if (isDashboard) return "Dashboard";
    if (isAddExpense) return "Add Expense";
    return "Air Pay";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100/80 bg-white/70 backdrop-blur-md px-6 py-4">
      <div className="flex items-center gap-4 w-full">
        
        {token && !isAuth && (
          <MenuButton
            onClick={() => setSidebarOpen((open) => !open)}
            isOpen={sidebarOpen}
          />
        )}

        {/* LEFT TITLE */}
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-[#0A3A2F]">
            {getTitle()}
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* user only show when logged in */}
          {user && !isAuth && (
            <span className="hidden sm:inline text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-xl">
              {user.email}
            </span>
          )}

          {/* optional route label */}
          {!isAuth && (
            <span className="text-xs font-bold text-[#0A3A2F] bg-[#0A3A2F]/10 px-3 py-1.5 rounded-full tracking-wide">
              {isDashboard ? "Dashboard" : "Expense"}
            </span>
          )}

        </div>
      </div>
    </header>
  );
}