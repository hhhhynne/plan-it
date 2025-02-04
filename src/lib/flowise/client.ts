import { FlowiseClient } from ".";

let flowiseClient: FlowiseClient;

export const getFlowiseClient = () => {
  const baseUrl = "https://flowise-pwin.onrender.com/api/v1/prediction";
  return (flowiseClient ??= new FlowiseClient(baseUrl));
};
