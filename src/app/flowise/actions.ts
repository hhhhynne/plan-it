"use server";

import { getFlowiseClient } from "@/lib/flowise/client";

export async function submitMessage(question: string, flowId: string) {
  const flowiseClient = getFlowiseClient();
  const res = await flowiseClient.invoke(flowId, question);
  return res;
}
