import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative min-h-screen flex flex-col bg-slate-950">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_bottom,rgba(76,29,149,0.25),transparent_50%)]" />

        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 px-6 py-10 md:px-12 lg:px-16 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full space-y-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
