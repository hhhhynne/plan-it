import { getFlowiseClient } from "@/lib/flowise/client";

const run = async () => {
  const flowiseClient = getFlowiseClient();
  const res = await flowiseClient.invoke(
    "c7079c25-835a-4af1-98df-949dd8e60a98",
    "What is the capital of France?"
  );
  return res;
};

run().then((res) => {
  console.log(res);
});
