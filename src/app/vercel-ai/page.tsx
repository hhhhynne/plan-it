"use client";

import { useChat } from "ai/react";

const apiRoutes = {
  basic: "/api/chat-v1",
  withTools: "/api/chat-v2",
  rag: "/api/chat-v3",
} as const;

export default function VercelAIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: apiRoutes.basic, // Toggle between the basic implementation and the one with tools
    maxSteps: 10,
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <p>
                {m.content.length > 0 ? (
                  m.content
                ) : (
                  <span className="italic font-light">
                    {"calling tool: " + m?.toolInvocations?.[0].toolName}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
