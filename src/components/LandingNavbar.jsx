import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Get Started", to: "/register", accent: true }
];

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderLinks = (stacked = false) =>
    links.map(({ label, to, accent }) => (
      <Link
        key={to}
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`text-sm font-medium transition ${
          accent
            ? "bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full"
            : "text-slate-200 hover:text-white"
        } ${stacked ? "text-center" : ""}`}
      >
        {label}
      </Link>
    ));

  return (
    <header className="px-6 sm:px-10 py-5 bg-slate-950/95 text-white border-b border-white/10 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-400 tracking-tight">
          SentinelX
        </h1>

        <div className="hidden md:flex items-center gap-6">
          {renderLinks()}
        </div>

        <button
          type="button"
          className="md:hidden px-3 py-2 rounded-full border border-white/20 text-white"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 border border-white/10 rounded-2xl bg-slate-950/95 p-4">
          {renderLinks(true)}
        </div>
      )}
    </header>
  );
}
