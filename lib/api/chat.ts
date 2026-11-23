import { apiClient } from "./client";

export type ChatSender = "VISITOR" | "ADMIN";
export type ChatStatus = "OPEN" | "RESOLVED";

export interface ChatMessage {
  id: number;
  sessionId: string;
  sender: ChatSender;
  senderName?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatSession {
  id: number;
  sessionId: string;
  visitorName: string;
  visitorEmail?: string | null;
  visitorPhone?: string | null;
  status: ChatStatus;
  unreadByAdmin: number;
  unreadByVisitor: number;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  messages?: ChatMessage[];
}

export interface InitSessionPayload {
  sessionId?: string;
  name?: string;
  email?: string;
  phone?: string;
  initialMessage?: string;
}

export const chatApi = {
  // Visitor endpoints
  initSession: (payload: InitSessionPayload) =>
    apiClient<ChatSession>("/chat/init", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getVisitorMessages: (sessionId: string, afterId?: number) => {
    const query = afterId ? `?afterId=${afterId}` : "";
    return apiClient<{ session: ChatSession; messages: ChatMessage[] }>(
      `/chat/${sessionId}/messages${query}`,
      { method: "GET" }
    );
  },

  sendVisitorMessage: (sessionId: string, message: string, senderName?: string) =>
    apiClient<ChatMessage>(`/chat/${sessionId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message, senderName }),
    }),

  // Admin endpoints
  getAdminSessions: (status?: ChatStatus, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiClient<ChatSession[]>(`/admin/chat/sessions${qs}`, {
      method: "GET",
    });
  },

  getAdminUnreadCount: () =>
    apiClient<{ unreadCount: number }>("/admin/chat/unread-count", {
      method: "GET",
    }),

  getAdminSessionDetails: (sessionId: string) =>
    apiClient<ChatSession>(`/admin/chat/sessions/${sessionId}`, {
      method: "GET",
    }),

  sendAdminMessage: (sessionId: string, message: string) =>
    apiClient<ChatMessage>(`/admin/chat/sessions/${sessionId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  updateSessionStatus: (sessionId: string, status: ChatStatus) =>
    apiClient<ChatSession>(`/admin/chat/sessions/${sessionId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  deleteSession: (sessionId: string) =>
    apiClient<null>(`/admin/chat/sessions/${sessionId}`, {
      method: "DELETE",
    }),
};
