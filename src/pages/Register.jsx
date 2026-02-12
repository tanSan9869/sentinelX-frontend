/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      await axios.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      setError("We couldn’t create your account. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="px-8 py-6">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          SentinelX
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur p-10 shadow-2xl space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Get started
            </p>
            <h1 className="text-3xl font-semibold">
              Create your SentinelX account
            </h1>
            <p className="text-slate-400">
              Spin up projects, pull API keys, and monitor threats in minutes.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="text-sm text-slate-300 mb-2 block" htmlFor="register-email">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-2 block" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a secure password"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-slate-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <footer className="text-center text-slate-600 text-sm py-6">
        © {new Date().getFullYear()} SentinelX
      </footer>
    </div>
  );
}
