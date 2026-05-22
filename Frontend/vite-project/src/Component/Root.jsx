
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/header.jsx";
import Sidebar from "./UI/Sidebar.jsx";

function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (location.state?.activeView) {
        setActiveView(location.state.activeView);
      } else {
        setActiveView("dashboard");
      }
    }
  }, [location]);

  const isAuth = location.pathname === "/login" || location.pathname === "/register";

  if (isAuth) {
    return (
      <div className="min-h-screen bg-[#E2EBE9] flex items-center justify-center p-4">
        <Outlet context={{ activeView, setActiveView, sidebarOpen, setSidebarOpen }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E2EBE9] flex items-center justify-center p-3 sm:p-5 md:p-8 font-sans antialiased text-zinc-800">
      {/* Floating White App Shell Container */}
      <div className="relative w-full max-w-6xl min-h-[88vh] bg-white rounded-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/60">
        
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeView={activeView}
          onNavigate={setActiveView}
        />

        {/* Content Wrapper on Right */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FCFDFD]">
          
          {/* Header */}
          <Header
            activeView={activeView}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          {/* Main Outlet Area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Outlet context={{ activeView, setActiveView, sidebarOpen, setSidebarOpen }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;