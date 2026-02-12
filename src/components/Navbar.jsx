import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleNavigate = () => setIsMenuOpen(false);

  const renderNavLinks = (extraClasses = "") =>
    navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${extraClasses} ${
            isActive
              ? "bg-white text-slate-900"
              : "text-slate-300 hover:text-white"
          }`
        }
        onClick={handleNavigate}
      >
        {item.label}
      </NavLink>
    ));

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/80 border-b border-white/10 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
          SentinelX Console
        </h2>

        <div className="hidden md:flex items-center gap-2">
          <nav className="flex items-center gap-2">
            {renderNavLinks()}
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-full text-sm font-semibold text-white transition"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2">
            {renderNavLinks("text-center")}
          </nav>
          <button
            onClick={() => {
              handleNavigate();
              handleLogout();
            }}
            className="w-full bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-full text-sm font-semibold text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
