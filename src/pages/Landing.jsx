import LandingNavbar from "../components/LandingNavbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight">
          Real-Time Security Monitoring <br />
          <span className="text-blue-500">For Modern Web Apps</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          SentinelX detects suspicious activity using behavior-based
          threat scoring and automatically blocks malicious IPs —
          keeping your backend secure.
        </p>

        <div className="mt-8 space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg"
          >
            Start Free
          </Link>

          <Link
            to="/login"
            className="border border-blue-500 px-6 py-3 rounded text-lg hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Security Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-400">
              Threat Scoring Engine
            </h3>
            <p className="text-gray-400 mt-4">
              Behavior-based scoring detects suspicious patterns,
              brute force attempts, and malicious route scanning.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-400">
              Auto IP Blocking
            </h3>
            <p className="text-gray-400 mt-4">
              Automatically blocks attackers with temporary bans
              and smart expiry logic.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-400">
              Easy SDK Integration
            </h3>
            <p className="text-gray-400 mt-4">
              Install our lightweight middleware and start
              monitoring in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-10 text-center">
        <h2 className="text-3xl font-bold mb-12">
          How SentinelX Works
        </h2>

        <div className="max-w-4xl mx-auto space-y-8 text-gray-400">
          <p>1. Register and create your project.</p>
          <p>2. Install SentinelX SDK in your backend.</p>
          <p>3. Monitor threats and block malicious IPs instantly.</p>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-slate-900 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-slate-800 p-8 rounded-xl">
            <h3 className="text-xl font-bold">Free</h3>
            <p className="mt-4 text-gray-400">
              5 IP Blocks<br />Basic Monitoring
            </p>
          </div>

          <div className="bg-blue-600 p-8 rounded-xl">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="mt-4">
              50 IP Blocks<br />Advanced Threat Detection
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="mt-4 text-gray-400">
              Unlimited Protection<br />Custom Rules
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} SentinelX. All rights reserved.
      </footer>
    </div>
  );
}
