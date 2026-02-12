/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Logs() {
  const { projectId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`/api/dashboard/${projectId}/logs`);
        setLogs(res.data);
      } catch (err) {
        setError("Unable to fetch logs right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [projectId]);

  return (
    <Layout>
      <div className="space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur px-8 py-10 shadow-[0_25px_70px_rgba(15,23,42,0.4)]">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Log stream
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">HTTP telemetry</h1>
          <p className="mt-3 text-slate-300 max-w-3xl">
            Inspect every request flowing through this project. Use the logs to trace suspicious routes, status spikes, or aggressive clients.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur p-6 shadow-lg">
          {loading ? (
            <p className="text-slate-400">Loading request activity…</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : logs.length === 0 ? (
            <p className="text-slate-400">No logs yet. Activity will appear here as soon as requests hit this project.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-slate-400">
                    <th className="py-3 pr-6 font-medium">IP Address</th>
                    <th className="py-3 pr-6 font-medium">Route</th>
                    <th className="py-3 pr-6 font-medium">Status</th>
                    <th className="py-3 font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-t border-white/5">
                      <td className="py-4 pr-6 text-white font-mono text-sm">{log.ip}</td>
                      <td className="py-4 pr-6 text-slate-300">{log.route}</td>
                      <td className="py-4 pr-6">
                        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                          {log.statusCode}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
