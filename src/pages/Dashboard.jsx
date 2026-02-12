import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [totals, setTotals] = useState({ projects: 0, blocked: 0, activeThreats: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/projects");
        const projects = res.data;

        if (projects.length === 0) {
          setTotals({ projects: 0, blocked: 0, activeThreats: 0 });
          return;
        }

        const summaries = await Promise.all(
          projects.map((project) =>
            axios
              .get(`/dashboard/${project.id}/threats`)
              .then((response) => response.data)
              .catch(() => ({ threats: [], blocked: [] }))
          )
        );

        const blocked = summaries.reduce((acc, summary) => acc + (summary.blocked?.length ?? 0), 0);
        const activeThreats = summaries.reduce((acc, summary) => (
          acc + (summary.threats?.filter((threat) => threat.score > 0)?.length ?? 0)
        ), 0);

        setTotals({ projects: projects.length, blocked, activeThreats });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Projects",
      value: totals.projects,
      detail: "Active integrations"
    },
    { label: "Blocked IPs", value: totals.blocked, detail: "Auto quarantine" },
    { label: "Active Threats", value: totals.activeThreats, detail: "Monitored in real time" }
  ];

  return (
    <Layout>
      <div className="space-y-10">
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur px-8 py-10 shadow-[0_25px_70px_rgba(15,23,42,0.4)]">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
            SentinelX overview
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Monitor every signal from a single glass dashboard.
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl">
            Get quick visibility into your footprint. Projects, blocked traffic, and live threats are summarized here while deeper investigations live in the dedicated pages.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/70 to-slate-800/40 p-6 shadow-lg"
            >
              <p className="text-slate-400 text-sm">{card.label}</p>
              <p className="text-4xl font-semibold text-white mt-3">{card.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-4">
                {card.detail}
              </p>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
