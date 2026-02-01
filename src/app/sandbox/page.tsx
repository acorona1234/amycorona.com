"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SANDBOX_USERNAME = "amy.m.corona@gmail.com";
const SANDBOX_PASSWORD = "letmein2026";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sandbox_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === SANDBOX_USERNAME && password === SANDBOX_PASSWORD) {
      localStorage.setItem("sandbox_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect username or password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sandbox_auth");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">🔐 Sandbox</h1>
              <p className="text-slate-400 text-sm">Enter credentials to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Enter Sandbox
              </button>
            </form>
          </div>
          
          <p className="text-center mt-4">
            <a href="/" className="text-slate-500 hover:text-slate-400 text-sm">
              ← Back to main site
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Authenticated - Project List
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              ← Main Site
            </Link>
            <span className="text-slate-600">|</span>
            <h1 className="text-lg font-bold">Sandbox</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>
      </header>

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
