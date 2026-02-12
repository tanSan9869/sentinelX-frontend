/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Threats() {
  const { projectId } = useParams();
  const [data, setData] = useState({ threats: [], blocked: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await axios.get(`/dashboard/${projectId}/threats`);
        setData(res.data);
      } catch (err) {
        setError("Unable to retrieve threat intel right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, [projectId]);

  const renderItems = (items, emptyLabel) => {
    if (items.length === 0) {
      return <p className="text-slate-500">{emptyLabel}</p>;
    }

    return (
      <div className="space-y-4 mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div>
              <p className="text-white font-mono text-sm">{item.ip}</p>
              {item.reason && (
                <p className="text-xs text-slate-400 mt-1">{item.reason}</p>
              )}
            </div>
            <div className="text-right">
              {item.score !== undefined && (
                <p className="text-blue-300 text-lg font-semibold">{item.score}</p>
              )}
              {item.expiresAt && (
                <p className="text-xs text-slate-500">
                  Expires {new Date(item.expiresAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header className="rounded-3xl border border-white/10 bg-linear-to-br from-purple-600/30 via-slate-900/60 to-slate-900/20 px-8 py-10 shadow-[0_25px_70px_rgba(15,23,42,0.45)]">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-200">
            Threat intel
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Behavioral scoring & automated blocks.
          </h1>
          <p className="mt-3 text-slate-200 max-w-3xl">
            Review hostile traffic, understand why an IP was blocked, and decide whether to unblock or escalate.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur p-6 shadow-lg space-y-6">
          {loading ? (
            <p className="text-slate-400">Loading threat telemetry…</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">High risk actors</h2>
                  <span className="text-sm text-slate-400">{data.threats.length} detected</span>
                </div>
                {renderItems(data.threats, "No high risk traffic detected." )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Blocked IPs</h2>
                  <span className="text-sm text-slate-400">{data.blocked.length} quarantined</span>
                </div>
                {renderItems(data.blocked, "No IPs are currently blocked.")}
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
