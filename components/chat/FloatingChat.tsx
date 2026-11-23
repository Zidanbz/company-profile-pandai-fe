"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  RefreshCw,
  Minus,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
} from "lucide-react";
import { chatApi, ChatMessage, ChatSession } from "@/lib/api/chat";

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initial form state
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [initialMsg, setInitialMsg] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem("pandai_chat_session_id");
    const savedName = localStorage.getItem("pandai_chat_name") || "";
    if (savedName) setVisitorName(savedName);

    if (savedSessionId) {
      chatApi
        .getVisitorMessages(savedSessionId)
        .then((res) => {
          setSession(res.session);
          setMessages(res.messages);
        })
        .catch(() => {
          localStorage.removeItem("pandai_chat_session_id");
          setSession(null);
        });
    }
  }, []);

  // Polling for new messages
  useEffect(() => {
    if (!session?.sessionId) return;

    const intervalTime = isOpen ? 3000 : 12000;
    const interval = setInterval(async () => {
      try {
        const res = await chatApi.getVisitorMessages(session.sessionId);
        setSession(res.session);
        setMessages(res.messages);

        if (!isOpen && res.session.unreadByVisitor > 0) {
          setUnreadCount(res.session.unreadByVisitor);
        } else if (isOpen) {
          setUnreadCount(0);
        }
      } catch (err) {
        // silent polling error
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [session?.sessionId, isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Handle Start Chat
  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      setInitError("Silakan isi nama Anda untuk memulai chat.");
      return;
    }

    setIsInitializing(true);
    setInitError(null);

    try {
      const res = await chatApi.initSession({
        name: visitorName.trim(),
        email: visitorEmail.trim() || undefined,
        phone: visitorPhone.trim() || undefined,
        initialMessage: initialMsg.trim() || undefined,
      });

      localStorage.setItem("pandai_chat_session_id", res.sessionId);
      localStorage.setItem("pandai_chat_name", visitorName.trim());

      setSession(res);
      setMessages(res.messages || []);
      setInitialMsg("");
    } catch (err: any) {
      setInitError(err.message || "Gagal menghubungkan ke live chat. Silakan coba lagi.");
    } finally {
      setIsInitializing(false);
    }
  };

  // Handle Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !session?.sessionId || isSending) return;

    const text = inputText.trim();
    setInputText("");
    setIsSending(true);

    try {
      const newMsg = await chatApi.sendVisitorMessage(
        session.sessionId,
        text,
        session.visitorName
      );
      setMessages((prev) => [...prev, newMsg]);
      scrollToBottom();
    } catch (err) {
      setInputText(text); // restore
    } finally {
      setIsSending(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Handle Reset / New Chat
  const handleResetChat = () => {
    if (confirm("Mulai percakapan baru? Riwayat chat ini akan direset dari browser Anda.")) {
      localStorage.removeItem("pandai_chat_session_id");
      setSession(null);
      setMessages([]);
      setInitialMsg("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Box */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[540px] max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pandai-blue to-blue-700 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg text-white border border-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-pandai-blue rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Pandai Live Support
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-200 inline" />
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                  Tim Siap Melayani
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {session && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Percakapan Baru"
                  className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50/70 dark:bg-slate-950/70 p-4 flex flex-col space-y-3">
            {!session ? (
              /* View 1: Form Inisialisasi Pengunjung */
              <div className="my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-pandai-blue dark:text-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-2 border border-blue-100 dark:border-blue-900">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Mulai Konsultasi Gratis
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Terhubung langsung dengan tim PT Pintu Data Indonesia tanpa login.
                  </p>
                </div>

                {initError && (
                  <div className="mb-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/50 p-2.5 rounded-lg border border-red-200 dark:border-red-900">
                    {initError}
                  </div>
                )}

                <form onSubmit={handleStartChat} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nama Anda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp / Email <span className="text-slate-400 font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="0812xxxx atau email@anda.com"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Ada yang bisa kami bantu? <span className="text-slate-400 font-normal">(opsional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Saya ingin tanya paket Cloud / Jaringan Fiber Optik..."
                      value={initialMsg}
                      onChange={(e) => setInitialMsg(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isInitializing}
                    className="w-full py-2.5 px-4 bg-pandai-blue hover:bg-pandai-dark text-white rounded-lg text-xs font-medium transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isInitializing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Menghubungkan...
                      </>
                    ) : (
                      <>
                        Mulai Chat Sekarang
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* View 2: List Pesan Chat */
              <>
                <div className="text-center my-1">
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                    Sesi terhubung sebagai <strong>{session.visitorName}</strong>
                  </span>
                </div>

                {messages.map((msg) => {
                  const isMe = msg.sender === "VISITOR";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1`}
                    >
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 px-1">
                        {isMe ? "Anda" : (msg.senderName || "Tim Pandai")} •{" "}
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div
                        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap shadow-sm ${
                          isMe
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
              </>
            )}
          </div>

          {/* Footer Input Bar (Hanya saat sesi aktif) */}
          {session && (
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ketik pesan untuk admin..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isSending}
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-pandai-blue text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="p-2.5 bg-pandai-blue hover:bg-pandai-dark text-white rounded-xl transition shadow disabled:opacity-40"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Floating Launcher Button */}
      <div className="relative group">
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 z-10 animate-bounce">
            {unreadCount}
          </span>
        )}

        {!isOpen && (
          <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium py-1.5 px-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat dengan Admin Pandai 💬
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setUnreadCount(0);
            }
          }}
          aria-label="Buka Live Chat"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-pandai-blue to-cyan-500 hover:from-pandai-dark hover:to-blue-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <MessageSquare className="w-6 h-6 transition-transform duration-200" />
          )}
        </button>
      </div>
    </div>
  );
};
