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
    const maxRetries = 5;
    let delay = 1000; // start at 1s
    let aiResp = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        aiResp = await step.ai.infer("generate-ai-llm-model-call", {
          model: step.ai.models.gemini({
            model: "gemini-2.0-flash",
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
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

        // If we got a valid response, break out of retry loop
        return aiResp;
      } catch (err) {
        // Check if it's a 503 or network error
        if (err?.code === 503 || err?.status === "UNAVAILABLE") {
          console.warn(
            `Attempt ${attempt + 1} failed (503 Service Unavailable). Retrying in ${delay}ms...`
          );
          if (attempt < maxRetries - 1) {
            await step.sleep(`retry-wait-${attempt}`, `${delay}ms`);
            delay *= 2; // exponential backoff
          }
        } else {
          // Any other error: don't retry
          throw err;
        }
      }
    }

    // If all retries failed, return a fallback response
    return {
      message:
        "Sorry, the AI service is currently overloaded. Please try again later.",
      status: "FAILED_OVERLOAD",
    };
  }
);