export class FlowiseClient {
  constructor(private readonly baseUrl: string) {}

  async invoke(flowId: string, input: string) {
    const response = await fetch(`${this.baseUrl}/${flowId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: input,
      }),
    });

    const result = await response.json();
    return result;
  }
}
