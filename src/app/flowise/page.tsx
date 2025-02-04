"use client";

import { useState } from "react";
import { submitMessage } from "./actions";

export default function FlowiseChat() {
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    const res = await submitMessage(
      formData.get("input") as string,
      "c7079c25-835a-4af1-98df-949dd8e60a98"
    );
    
    setResponse(res.text);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {response && (
        <div className="mb-4 p-4 rounded bg-gray-100">{response}</div>
      )}

      <form action={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          name="input"
          placeholder="Say something..."
        />
      </form>
    </div>
  );
}
