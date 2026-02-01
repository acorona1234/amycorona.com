"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = "https://api.amycorona.com";

// Real Gmail labels
const LABELS = [
  { id: "inbox", name: "Inbox", emoji: "📥", color: "bg-blue-500", desc: "Keep in inbox" },
  { id: "!Amy", name: "!Amy", emoji: "⭐", color: "bg-yellow-500", desc: "Needs attention" },
  { id: "Receipts", name: "Receipts", emoji: "🧾", color: "bg-green-500", desc: "Tax records" },
  { id: "Newsletters", name: "Newsletters", emoji: "📰", color: "bg-purple-500", desc: "Weekly digest" },
  { id: "Promotions", name: "Promos", emoji: "🏷️", color: "bg-pink-600", desc: "Deals & offers" },
  { id: "Social", name: "Social", emoji: "👥", color: "bg-sky-500", desc: "Social updates" },
  { id: "Archive", name: "Archive", emoji: "📦", color: "bg-amber-600", desc: "Archive for later" },
  { id: "Hidden", name: "Hidden", emoji: "👁️", color: "bg-slate-600", desc: "Archive silently" },
  { id: "Personal", name: "Personal", emoji: "💜", color: "bg-pink-500", desc: "Personal emails" },
  { id: "Review", name: "Review", emoji: "👀", color: "bg-orange-500", desc: "Review later" },
  { id: "Waiting on", name: "Waiting", emoji: "⏳", color: "bg-cyan-500", desc: "Awaiting reply" },
  { id: "trash", name: "Trash", emoji: "🗑️", color: "bg-red-500", desc: "Delete" },
];

interface Email {
  id: string;
  sender: string;
  subject: string;
  date: string;
  body_preview: string;
  predicted_label: string;
  confidence: number;
}

interface LabeledEmail {
  id: string;
  sender: string;
  subject: string;
  label: string;
  timestamp: string;
}

interface SenderGroup {
  sender: string;
  senderName: string;
  senderEmail: string;
  emails: Email[];
  predictedLabel: string;
}

export default function EmailClassifier() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [labeledEmails, setLabeledEmails] = useState<LabeledEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ training_count: 0, blocked_count: 0 });
  const [processing, setProcessing] = useState<string | null>(null);
  const [expandedSender, setExpandedSender] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"pending" | "labeled">("pending");
  const [activeLabels, setActiveLabels] = useState<Set<string>>(new Set(LABELS.map(l => l.id)));

  const toggleLabel = (labelId: string) => {
    const newActive = new Set(activeLabels);
    if (newActive.has(labelId)) {
      // Don't allow deselecting all
      if (newActive.size > 1) {
        newActive.delete(labelId);
      }
    } else {
      newActive.add(labelId);
    }
    setActiveLabels(newActive);
  };

  const visibleLabels = LABELS.filter(l => activeLabels.has(l.id));

  const fetchEmails = async (refresh = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/emails${refresh ? "?refresh=true" : ""}`);
      const data = await res.json();
      setEmails(data.emails || []);
    } catch (err) {
      setError("Failed to connect to classifier API. Is it running?");
    }
    setLoading(false);
  };

  const fetchLabeled = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/labeled`);
      const data = await res.json();
      setLabeledEmails(data.emails || []);
    } catch (err) {}
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {}
  };

  const applyLabel = async (email: Email | LabeledEmail, label: string) => {
    setProcessing(email.id);
    try {
      await fetch(`${API_BASE}/api/label`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: email.id,
          gmail_id: email.id,
          sender: email.sender,
          subject: email.subject,
          label: label,
        }),
      });
      if (viewMode === "pending") {
        setEmails(emails.filter((e) => e.id !== email.id));
      }
      fetchStats();
      fetchLabeled();
    } catch (err) {
      setError("Failed to apply label");
    }
    setProcessing(null);
  };

  const applyLabelToAll = async (senderEmails: Email[], label: string) => {
    setProcessing(senderEmails[0]?.sender || null);
    for (const email of senderEmails) {
      try {
        await fetch(`${API_BASE}/api/label`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_id: email.id,
            gmail_id: email.id,
            sender: email.sender,
            subject: email.subject,
            label: label,
          }),
        });
      } catch (err) {}
    }
    setEmails(emails.filter((e) => !senderEmails.find((se) => se.id === e.id)));
    fetchStats();
    fetchLabeled();
    setProcessing(null);
  };

  const blockSender = async (sender: string) => {
    if (!confirm(`Block all future emails from this sender?`)) return;
    try {
      await fetch(`${API_BASE}/api/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender }),
      });
      setEmails(emails.filter((e) => e.sender !== sender));
    } catch (err) {
      setError("Failed to block sender");
    }
  };

  const unsubscribe = async (emailId: string, sender: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_id: emailId }),
      });
      const data = await res.json();
      if (data.link) {
        window.open(data.link, "_blank");
      } else {
        alert("No unsubscribe link found in this email. Try blocking instead.");
      }
    } catch (err) {
      alert("Could not find unsubscribe link");
    }
  };

  const moveToReview = async (emailId: string) => {
    try {
      await fetch(`${API_BASE}/api/unreview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_id: emailId }),
      });
      setLabeledEmails(labeledEmails.filter((e) => e.id !== emailId));
      fetchEmails(true);
    } catch (err) {
      setError("Failed to move back to review");
    }
  };

  useEffect(() => {
    fetchEmails(true);
    fetchLabeled();
    fetchStats();
  }, []);

  // Group emails by sender
  const getSenderEmail = (sender: string) => {
    const match = sender.match(/<([^>]+)>/);
    return match ? match[1].toLowerCase() : sender.toLowerCase();
  };

  const getSenderName = (sender: string) => {
    const match = sender.match(/^"?([^"<]+)"?\s*</);
    return match ? match[1].trim() : sender.split("@")[0];
  };

  const senderGroups: SenderGroup[] = [];
  const senderMap = new Map<string, SenderGroup>();

  emails.forEach((email) => {
    const senderEmail = getSenderEmail(email.sender);
    if (senderMap.has(senderEmail)) {
      senderMap.get(senderEmail)!.emails.push(email);
    } else {
      const group: SenderGroup = {
        sender: email.sender,
        senderName: getSenderName(email.sender),
        senderEmail,
        emails: [email],
        predictedLabel: email.predicted_label,
      };
      senderMap.set(senderEmail, group);
      senderGroups.push(group);
    }
  });

  // Sort by email count (most emails first)
  senderGroups.sort((a, b) => b.emails.length - a.emails.length);

  const getLabelInfo = (id: string) => LABELS.find((l) => l.id === id) || LABELS[0];

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      if (diffDays < 14) return `1w ago`;
      if (diffDays < 365) return "2w+";
      return "1yr+";
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed Header + Legend */}
      <div className="sticky top-0 z-10 bg-slate-900">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/sandbox/honeypot"
                className="text-slate-400 hover:text-white text-sm"
              >
                ←
              </Link>
              <h1 className="text-lg font-bold">📧 Email Classifier</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs hidden sm:inline">
                {stats.training_count} learned
              </span>
              <button
                onClick={() => {
                  fetchEmails(true);
                  fetchLabeled();
                }}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-3 py-1.5 rounded-lg text-sm font-medium"
              >
                {loading ? "..." : "↻"}
              </button>
            </div>
          </div>
        </header>

        {/* Sticky Legend - Clickable to toggle */}
        <div className="bg-slate-800/95 backdrop-blur border-b border-slate-700 px-4 py-2">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-1.5 justify-center">
              {LABELS.map((label) => (
                <button 
                  key={label.id}
                  onClick={() => toggleLabel(label.id)}
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg transition-all ${
                    activeLabels.has(label.id)
                      ? `${label.color}/30 ring-1 ring-white/20`
                      : "bg-slate-700/30 opacity-40"
                  }`}
                  title={activeLabels.has(label.id) ? `Hide ${label.name}` : `Show ${label.name}`}
                >
                  <span>{label.emoji}</span>
                  <span className={activeLabels.has(label.id) ? "text-slate-300" : "text-slate-500"}>{label.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2">
          <div className="max-w-3xl mx-auto flex justify-center">
            <div className="inline-flex bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("pending")}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                  viewMode === "pending"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Needs Review ({emails.length})
              </button>
              <button
                onClick={() => setViewMode("labeled")}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                  viewMode === "labeled"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Already Labeled ({labeledEmails.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {viewMode === "pending" ? (
          // PENDING VIEW
          <>
            {loading && emails.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                Loading emails...
              </div>
            ) : senderGroups.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No emails to classify! All caught up. 🎉
              </div>
            ) : (
              <div className="space-y-2">
                {senderGroups.map((group) => {
                  const predictedLabel = getLabelInfo(group.predictedLabel);
                  const isExpanded = expandedSender === group.senderEmail;
                  const isProcessing = processing === group.sender;

                  return (
                    <div
                      key={group.senderEmail}
                      className={`bg-slate-800 rounded-xl overflow-hidden transition-all ${
                        isProcessing ? "opacity-50" : ""
                      }`}
                    >
                      {/* Sender Header */}
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div 
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => setExpandedSender(isExpanded ? null : group.senderEmail)}
                          >
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-medium text-white truncate text-sm">
                                {group.senderName}
                              </span>
                              {group.emails.length > 1 && (
                                <span className="bg-slate-700 text-slate-300 text-xs px-1.5 py-0.5 rounded-full">
                                  {group.emails.length}
                                </span>
                              )}
                              <span className={`${predictedLabel.color} text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1`}>
                                {predictedLabel.emoji}
                                <span className="opacity-80">{Math.round(group.emails[0].confidence * 100)}%</span>
                              </span>
                            </div>
                            <div className="text-slate-400 text-xs truncate">
                              {group.emails[0].subject}
                            </div>
                            <div className="text-slate-500 text-xs">
                              {formatDate(group.emails[0].date)}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => unsubscribe(group.emails[0].id, group.sender)}
                            className="text-slate-600 hover:text-orange-400 p-1"
                            title="Find unsubscribe link"
                          >
                            📭
                          </button>
                          <button
                            onClick={() => blockSender(group.sender)}
                            className="text-slate-600 hover:text-red-400 p-1"
                            title="Block sender"
                          >
                            🚫
                          </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-1 flex-wrap">
                          {visibleLabels.map((label) => (
                            <button
                              key={label.id}
                              onClick={() => applyLabelToAll(group.emails, label.id)}
                              disabled={isProcessing}
                              className={`h-8 px-2 rounded-lg flex items-center justify-center text-sm transition-all ${
                                group.predictedLabel === label.id
                                  ? `${label.color} ring-2 ring-white/20`
                                  : "bg-slate-700 hover:bg-slate-600"
                              }`}
                              title={`${label.name}: ${label.desc}`}
                            >
                              {label.emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Expanded email list */}
                      {isExpanded && group.emails.length > 1 && (
                        <div className="border-t border-slate-700 bg-slate-850">
                          {group.emails.map((email, idx) => (
                            <div
                              key={email.id}
                              className={`px-3 py-2 flex items-center justify-between gap-2 ${
                                idx !== group.emails.length - 1 ? "border-b border-slate-700/50" : ""
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-slate-300 truncate">{email.subject}</div>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                {visibleLabels.slice(0, 6).map((label) => (
                                  <button
                                    key={label.id}
                                    onClick={() => applyLabel(email, label.id)}
                                    disabled={processing === email.id}
                                    className="w-6 h-6 rounded flex items-center justify-center text-xs bg-slate-700 hover:bg-slate-600"
                                    title={label.name}
                                  >
                                    {label.emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          // LABELED VIEW
          <>
            {labeledEmails.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No labeled emails yet. Start classifying!
              </div>
            ) : (
              <div className="space-y-2">
                {labeledEmails.map((email) => {
                  const labelInfo = getLabelInfo(email.label);
                  const isProcessing = processing === email.id;

                  return (
                    <div
                      key={email.id + email.timestamp}
                      className={`bg-slate-800 rounded-xl p-3 transition-all ${
                        isProcessing ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-medium text-white truncate text-sm">
                              {getSenderName(email.sender)}
                            </span>
                            <span className={`${labelInfo.color} text-white text-xs px-1.5 py-0.5 rounded`}>
                              {labelInfo.emoji} {labelInfo.name}
                            </span>
                          </div>
                          <div className="text-slate-400 text-xs truncate">
                            {email.subject}
                          </div>
                          <div className="text-slate-500 text-xs">
                            {formatDate(email.timestamp)}
                          </div>
                        </div>
                      </div>

                      {/* Change label buttons */}
                      <div className="flex gap-1 flex-wrap items-center">
                        {visibleLabels.map((label) => (
                          <button
                            key={label.id}
                            onClick={() => applyLabel(email, label.id)}
                            disabled={isProcessing}
                            className={`h-8 px-2 rounded-lg flex items-center justify-center text-sm transition-all ${
                              email.label === label.id
                                ? `${label.color} ring-2 ring-white/20`
                                : "bg-slate-700 hover:bg-slate-600"
                            }`}
                            title={`Change to ${label.name}`}
                          >
                            {label.emoji}
                          </button>
                        ))}
                        <button
                          onClick={() => moveToReview(email.id)}
                          className="h-8 px-2 rounded-lg bg-slate-700 hover:bg-indigo-600 text-xs text-slate-300"
                          title="Move back to Needs Review"
                        >
                          ↩️ Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Footer hint */}
        {(viewMode === "pending" ? senderGroups.length > 0 : labeledEmails.length > 0) && (
          <div className="text-center text-slate-500 text-xs mt-6">
            Tap labels in key to show/hide • {viewMode === "pending" 
              ? "Tap sender to expand"
              : "Tap a button to change label"
            }
          </div>
        )}
      </main>
    </div>
  );
}
