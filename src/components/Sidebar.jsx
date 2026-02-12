import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/dashboard" }
];

export default function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <div className="h-full w-full p-6 bg-white">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        SentinelX
      </h1>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => onNavigate?.()}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
