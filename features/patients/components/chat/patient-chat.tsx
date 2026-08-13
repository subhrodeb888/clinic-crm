"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Send, Sparkles } from "lucide-react";

import { chat } from "@/actions/chat/chat";
import { getChatMessages } from "@/actions/chat/get-chat-messages";
import { getChatSessions } from "@/actions/chat/get-chat-sessions";
import type { ChatCitation } from "@/db/schema";
import type {
  ChatMessage,
  ChatSession,
} from "@/repositories/chat.repository";
import type { Patient } from "@/types/patient";

import { ChatCitationCard } from "./chat-citation-card";

type PatientChatProps = {
  patient: Patient;
};

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations: ChatCitation[] | null;
};

function toUiMessage(message: ChatMessage): UiMessage {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    citations: message.citations,
  };
}

export function PatientChat({ patient }: PatientChatProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isPending, startTransition] = useTransition();

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load the conversation history and open the most recent session.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const sessionsResult = await getChatSessions(patient.id);

      if (cancelled) return;

      if (!sessionsResult.success) {
        setError(sessionsResult.error);
        setIsLoading(false);
        return;
      }

      setSessions(sessionsResult.sessions);

      const latest = sessionsResult.sessions[0];

      if (latest) {
        setSessionId(latest.id);

        const messagesResult = await getChatMessages(latest.id, patient.id);

        if (cancelled) return;

        if (messagesResult.success) {
          setMessages(messagesResult.messages.map(toUiMessage));
        } else {
          setError(messagesResult.error);
        }
      }

      setIsLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [patient.id]);

  // Keep the newest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  function handleSelectSession(id: string) {
    setError("");
    setSessionId(id);

    startTransition(async () => {
      const result = await getChatMessages(id, patient.id);

      if (result.success) {
        setMessages(result.messages.map(toUiMessage));
      } else {
        setError(result.error);
      }
    });
  }

  function handleNewChat() {
    setSessionId(null);
    setMessages([]);
    setError("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = question.trim();

    if (!trimmed || isPending) return;

    setError("");
    setQuestion("");

    startTransition(async () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `local-user-${Date.now()}`,
          role: "user",
          content: trimmed,
          citations: null,
        },
      ]);

      const result = await chat({
        patientId: patient.id,
        question: trimmed,
        sessionId: sessionId ?? undefined,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSessionId(result.sessionId);

      setMessages((prev) => [
        ...prev,
        {
          id: `local-assistant-${Date.now()}`,
          role: "assistant",
          content: result.answer,
          citations: result.citations,
        },
      ]);

      // Refresh the conversation list so a newly created session appears.
      const sessionsResult = await getChatSessions(patient.id);

      if (sessionsResult.success) {
        setSessions(sessionsResult.sessions);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Assistant
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Ask questions about this patient’s documents. Answers are
            grounded in uploaded files and include citations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {sessions.length > 0 && (
            <select
              value={sessionId ?? ""}
              onChange={(e) => handleSelectSession(e.target.value)}
              disabled={isPending}
              className="max-w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              {sessions.map((chatSession) => (
                <option key={chatSession.id} value={chatSession.id}>
                  {chatSession.title}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={handleNewChat}
            disabled={isPending}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            New Chat
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="max-h-[28rem] min-h-64 space-y-4 overflow-y-auto p-6">
          {isLoading && (
            <p className="py-12 text-center text-sm text-gray-500">
              Loading conversation...
            </p>
          )}

          {!isLoading && messages.length === 0 && !isPending && (
            <p className="py-12 text-center text-sm text-gray-500">
              Ask a question about this patient’s medical documents to get
              started.
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-xl rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white"
                    : "max-w-xl rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900"
                }
              >
                <p className="whitespace-pre-wrap">{message.content}</p>

                {message.role === "assistant" &&
                  message.citations &&
                  message.citations.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Sources
                      </p>

                      {message.citations.map((citation) => (
                        <ChatCitationCard
                          key={`${citation.documentId}-${citation.chunkIndex}-${citation.ref}`}
                          citation={citation}
                          patientId={patient.id}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && (
          <div className="border-t border-gray-200 px-6 py-3">
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3 border-t border-gray-200 p-4"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isPending || isLoading}
            rows={2}
            placeholder="Ask about lab results, diagnoses, medications..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isPending || isLoading || !question.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
