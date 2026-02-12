import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" }
];

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-slate-950/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          SentinelX Console
        </h2>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-full text-sm font-semibold text-white transition"
      >
        Logout
      </button>
    </div>
  );
}
