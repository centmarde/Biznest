import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_OPEN_AI;

if (!apiKey) {
  throw new Error(
    "API key is missing or empty. Please provide a valid API key."
  );
}

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

function formatResponse(content: string): string {
  return content.replace(/\n/g, "<br>");
}

export function Response() {
  // Simple string instead of reactive object (which is Vue-specific)
  let chatContent = "";

  async function getResponse(query: string): Promise<string> {
    chatContent = "";
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in industrial painting. Provide helpful, detailed information about industrial painting techniques, costs, materials, and best practices. For quotes, give reasonable estimates but remind users that actual costs depend on many factors and they should get a professional assessment."
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "allam-2-7b",
      temperature: 0.6,
      max_completion_tokens: 600,
      top_p: 0.95,
      stream: true,
      stop: null,
    });

    let fullResponse = "";
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      chatContent += formatResponse(content);
    }
    
    return fullResponse;
  }

  return {
    chatContent,
    getResponse,
  };
}