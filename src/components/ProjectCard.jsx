import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function ProjectCard({ project, updateProjectKey, onProjectDeleted }) {
  const [showKey, setShowKey] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const maskedKey = project.apiKey.substring(0, 12) + "************";

  const handleCopy = () => {
    navigator.clipboard.writeText(project.apiKey);
    alert("API Key copied!");
  };

  const handleRegenerate = async () => {
    if (!window.confirm("Regenerate API key? Old key will stop working.")) {
      return;
    }

    const res = await axios.put(`/projects/${project.id}/regenerate`);
    updateProjectKey(res.data);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${project.name}? This cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`/projects/${project.id}`);
      onProjectDeleted?.(project.id);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="bg-white/5 border border-white/15 rounded-3xl p-6 mb-4 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold text-white">{project.name}</h4>
          <p className="text-sm text-slate-300 mt-2">
            <span className="font-semibold text-slate-200">API Key:</span>{" "}
            {showKey ? project.apiKey : maskedKey}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? "Hide" : "Show"}
          </button>
          <button
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white"
            onClick={handleCopy}
          >
            Copy
          </button>
          <button
            className="bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-full text-white"
            onClick={handleRegenerate}
          >
            Regenerate
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <Link to={`/logs/${project.id}`}>
          <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-full text-white">
            View Logs
          </button>
        </Link>
        <Link to={`/threats/${project.id}`}>
          <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-full text-white">
            View Threats
          </button>
        </Link>
        <button
          className="bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Project"}
        </button>
      </div>
    </div>
  );
}
