/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "../api/axios";
import ProjectCard from "../components/ProjectCard";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
      setError("");
    } catch (err) {
      setError("Unable to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (event) => {
    event.preventDefault();
    if (!projectName.trim()) {
      return;
    }

    try {
      setLoading(true);
      await axios.post("/projects", { name: projectName.trim() });
      setProjectName("");
      fetchProjects();
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const updateProjectKey = (updatedProject) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  };

  const handleProjectDeleted = (projectId) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  return (
    <Layout>
      <div className="space-y-10">
        <header className="rounded-3xl border border-white/10 bg-linear-to-br from-blue-600/30 via-slate-900/60 to-slate-900/30 px-8 py-10 shadow-[0_25px_70px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-200">
            Projects
          </p>
          <h1 className="text-4xl font-semibold text-white mt-4">
            Manage every integration from a single command center.
          </h1>
          <p className="text-slate-200 mt-4 max-w-3xl">
            Create new environments, rotate API keys, and jump into telemetry views without leaving this surface.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-lg">
          <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleCreateProject}>
            <div className="flex-1">
              <label htmlFor="projectName" className="block text-sm font-medium text-slate-200 mb-2">
                Project name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="e.g. Payment API"
                className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto rounded-2xl bg-blue-600 text-white font-semibold px-6 py-3 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create project"}
              </button>
            </div>
          </form>
          {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Your projects</h2>
            <p className="text-sm text-slate-400">{projects.length} total</p>
          </div>
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 p-10 text-center text-slate-400">
              No projects yet. Create one to get an API key and start sending logs.
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                updateProjectKey={updateProjectKey}
                onProjectDeleted={handleProjectDeleted}
              />
            ))
          )}
        </section>
      </div>
    </Layout>
  );
}
