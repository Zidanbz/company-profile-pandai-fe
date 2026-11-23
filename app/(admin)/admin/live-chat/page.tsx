"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";
import { chatApi, ChatMessage, ChatSession, ChatStatus } from "@/lib/api/chat";

export default function AdminLiveChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [statusFilter, setStatusFilter] = useState<ChatStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch all sessions
  const fetchSessions = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const filter = statusFilter === "ALL" ? undefined : statusFilter;
      const res = await chatApi.getAdminSessions(filter, searchQuery);
      setSessions(res);

      // If active session is selected, keep its unread count synchronized
      if (activeSessionId) {
        const found = res.find((s) => s.sessionId === activeSessionId);
        if (found) {
          setActiveSession((prev) => (prev ? { ...prev, ...found } : found));
        }
      }
    } catch (err) {
      // silent fetch error
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  // Initial fetch and on filter/search change
  useEffect(() => {
    fetchSessions(true);
  }, [statusFilter, searchQuery]);

  // Polling for session updates and active chat messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      fetchSessions(false);

      if (activeSessionId) {
        try {
          const detail = await chatApi.getAdminSessionDetails(activeSessionId);
          setActiveSession(detail);
          setMessages(detail.messages || []);
        } catch (err) {
          // ignore polling error
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSessionId, statusFilter, searchQuery]);

  // When clicking a session
  const handleSelectSession = async (sessionId: string) => {
    setActiveSessionId(sessionId);
    try {
      const detail = await chatApi.getAdminSessionDetails(sessionId);
      setActiveSession(detail);
      setMessages(detail.messages || []);
      // Optimistically clear unread in list
      setSessions((prev) =>
        prev.map((s) => (s.sessionId === sessionId ? { ...s, unreadByAdmin: 0 } : s))
      );
    } catch (err) {
      alert("Gagal memuat detail percakapan.");
    }
  };

  // Scroll on messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send admin reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReply.trim() || !activeSessionId || isSending) return;

    const text = adminReply.trim();
    setAdminReply("");
    setIsSending(true);

    try {
      const newMsg = await chatApi.sendAdminMessage(activeSessionId, text);
      setMessages((prev) => [...prev, newMsg]);
      scrollToBottom();
      fetchSessions(false);
    } catch (err) {
      alert("Gagal mengirim balasan.");
      setAdminReply(text);
    } finally {
      setIsSending(false);
      setTimeout(() => replyInputRef.current?.focus(), 50);
    }
  };

  // Quick Canned Response
  const handleQuickReply = (text: string) => {
    setAdminReply(text);
    replyInputRef.current?.focus();
  };

  // Toggle Status (OPEN / RESOLVED)
  const handleToggleStatus = async () => {
    if (!activeSession) return;
    const newStatus: ChatStatus = activeSession.status === "OPEN" ? "RESOLVED" : "OPEN";
    setIsUpdatingStatus(true);
    try {
      const updated = await chatApi.updateSessionStatus(activeSession.sessionId, newStatus);
      setActiveSession((prev) => (prev ? { ...prev, status: updated.status } : null));
      setSessions((prev) =>
        prev.map((s) => (s.sessionId === activeSession.sessionId ? { ...s, status: updated.status } : s))
      );
    } catch (err) {
      alert("Gagal memperbarui status chat.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Delete Session
  const handleDeleteSession = async () => {
    if (!activeSession) return;
    if (confirm(`Yakin ingin menghapus sesi chat dari "${activeSession.visitorName}" secara permanen?`)) {
      try {
        await chatApi.deleteSession(activeSession.sessionId);
        setSessions((prev) => prev.filter((s) => s.sessionId !== activeSession.sessionId));
        setActiveSessionId(null);
        setActiveSession(null);
        setMessages([]);
      } catch (err) {
        alert("Gagal menghapus percakapan.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-pandai-blue" />
            Live Chat Pengunjung
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pantau dan balas pertanyaan pengunjung website secara langsung (real-time).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchSessions(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] max-h-[750px]">
        {/* ======================================================== */}
        {/* LEFT PANE: Daftar Sesi Chat (lg:col-span-4)               */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          {/* Search & Filter */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pengunjung / email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-lg text-xs">
              {(["ALL", "OPEN", "RESOLVED"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`flex-1 py-1 px-2 rounded-md font-medium transition ${
                    statusFilter === tab
                      ? "bg-white dark:bg-slate-700 text-pandai-blue dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab === "ALL" ? "Semua" : tab === "OPEN" ? "Aktif" : "Selesai"}
                </button>
              ))}
            </div>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {isLoading ? (
              <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-pandai-blue" />
                Memuat percakapan...
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                Tidak ada percakapan ditemukan.
              </div>
            ) : (
              sessions.map((s) => {
                const isSelected = activeSessionId === s.sessionId;
                const lastMsg = s.messages && s.messages[0];
                return (
                  <button
                    key={s.sessionId}
                    type="button"
                    onClick={() => handleSelectSession(s.sessionId)}
                    className={`w-full text-left p-4 transition flex items-start space-x-3 ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-slate-800/90 border-l-4 border-pandai-blue"
                        : "hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pandai-blue to-cyan-500 text-white font-semibold text-xs flex items-center justify-center">
                        {s.visitorName.charAt(0).toUpperCase()}
                      </div>
                      {s.status === "OPEN" && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {s.visitorName}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {new Date(s.lastMessageAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {lastMsg ? lastMsg.message : "Sesi baru dimulai..."}
                      </p>

                      <div className="flex items-center justify-between mt-1.5">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            s.status === "OPEN"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {s.status === "OPEN" ? "Aktif" : "Selesai"}
                        </span>

                        {s.unreadByAdmin > 0 && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {s.unreadByAdmin} baru
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANE: Chat Room (lg:col-span-8)                      */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900">
          {activeSession ? (
            <>
              {/* Active Chat Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-pandai-blue text-white font-bold flex items-center justify-center text-sm">
                    {activeSession.visitorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                        {activeSession.visitorName}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          activeSession.status === "OPEN"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {activeSession.status === "OPEN" ? "Sesi Aktif" : "Selesai"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {activeSession.visitorEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {activeSession.visitorEmail}
                        </span>
                      )}
                      {activeSession.visitorPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {activeSession.visitorPhone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    disabled={isUpdatingStatus}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 border ${
                      activeSession.status === "OPEN"
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeSession.status === "OPEN" ? "Tandai Selesai" : "Buka Sesi Kembali"}
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteSession}
                    title="Hapus Percakapan"
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40 dark:bg-slate-950/40">
                {messages.map((msg) => {
                  const isAdmin = msg.sender === "ADMIN";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAdmin ? "items-end" : "items-start"} space-y-1`}
                    >
                      <span className="text-[10px] text-slate-400 px-1">
                        {isAdmin ? (msg.senderName || "Admin") : activeSession.visitorName} •{" "}
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap shadow-sm ${
                          isAdmin
                            ? "bg-pandai-blue text-white rounded-tr-none"
                            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 rounded-tl-none"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Responses */}
              <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-pandai-blue" />
                  Balasan Cepat:
                </span>
                {[
                  "Halo! Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?",
                  "Tentu, tim teknis kami siap membantu kebutuhan solusi digital Anda.",
                  "Bisa kami jadwalkan konsultasi lebih lanjut via WhatsApp atau Call?",
                ].map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickReply(template)}
                    className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] px-2.5 py-1 rounded-full transition"
                  >
                    {template.length > 35 ? `${template.substring(0, 35)}...` : template}
                  </button>
                ))}
              </div>

              {/* Reply Input Bar */}
              <form
                onSubmit={handleSendReply}
                className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
              >
                <input
                  ref={replyInputRef}
                  type="text"
                  placeholder={
                    activeSession.status === "RESOLVED"
                      ? "Sesi telah ditandai selesai. Buka kembali sesi untuk membalas..."
                      : "Ketik balasan untuk pengunjung..."
                  }
                  value={adminReply}
                  onChange={(e) => setAdminReply(e.target.value)}
                  disabled={isSending || activeSession.status === "RESOLVED"}
                  className="flex-1 text-xs px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!adminReply.trim() || isSending || activeSession.status === "RESOLVED"}
                  className="px-4 py-2.5 bg-pandai-blue hover:bg-pandai-dark text-white rounded-xl transition text-xs font-medium shadow flex items-center gap-1.5 disabled:opacity-40"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Kirim</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                Pilih Sesi Percakapan
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Pilih salah satu pengunjung dari panel kiri untuk mulai membaca dan membalas chat secara langsung.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
