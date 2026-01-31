import Link from "next/link";

const projects = [
  {
    name: "Honeypot Labs",
    emoji: "🍯",
    description: "App development workspace",
    href: "/sandbox/honeypot",
    status: "active",
  },
];

export default function Sandbox() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              ← Main Site
            </Link>
            <span className="text-slate-600">|</span>
            <h1 className="text-lg font-bold">Sandbox</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Projects</h2>
          <p className="text-slate-400">Select a project to continue</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {projects.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 hover:bg-slate-750 transition-all group"
            >
              <div className="text-4xl mb-3">{project.emoji}</div>
              <h3 className="font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-slate-400 text-sm">{project.description}</p>
              {project.status === "active" && (
                <span className="inline-block mt-3 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
