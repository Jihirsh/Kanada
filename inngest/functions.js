import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const llmModel = inngest.createFunction(
  { id: "llm-model" },
  { event: "llm-model" },
  async ({ event, step }) => {
    const aiResp = await step.ai.infer("generate-ai-llm-model-call", {
      model: step.ai.models.gemini({
        model: "gemini-1.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      body: {
        contents: [
          {
            role: "system",
            parts: [
              {
                text:
                  "Depends on user input sources, Summarize and search about topic, Give me markdown text with proper formatting. User input is:" +
                  event.data.searchInput,
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: JSON.stringify(event.data.searchResult),
              },
            ],
          },
        ],
      },
    });
    return aiResp;
  }
);
