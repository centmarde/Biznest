import Groq from "groq-sdk";
import axios from "axios";

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

// Function to fetch chat configuration
async function fetchChatConfig() {
  try {
    const response = await axios.get("/data/chatConfig.json");
    console.log("Chat config fetched successfully:", response.data);
    return response.data.chatCompletion;
  } catch (error) {
    console.error("Error fetching chat config:", error);
    // Fallback configuration
    return {
      messages: [
        {
          role: "system",
          content: "You are a business zoning assistant expert Philippines. Provide helpful, detailed information about business zoning regulations, permits, land use classifications, and commercial development guidelines. Help users understand zoning requirements for different business types, permit processes, and compliance requirements. Always reference Philippines' specific zoning ordinances and regulations when applicable."
        }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6,
      max_completion_tokens: 600,
      top_p: 0.95,
      stream: true,
      stop: null,
    };
  }
}



// Function to format AI response text with proper line breaks for markdown-style formatting
export function formatAIResponse(text: string): string {
  return text
    // Add line breaks before and after *** (bold + italic)
    .replace(/\*\*\*/g, '<br/>***')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<br/><strong><em>$1</em></strong><br/>')
    // Add line breaks before and after ** (bold)
    .replace(/\*\*/g, '<br/>**')
    .replace(/\*\*([^*]+)\*\*/g, '<br/><strong>$1</strong><br/>')
    // Clean up multiple consecutive line breaks
    .replace(/(<br\/>){3,}/g, '<br/><br/>')
    // Remove leading line breaks
    .replace(/^(<br\/>)+/, '')
    // Convert regular line breaks to HTML
    .replace(/\n/g, '<br/>');
}

function formatResponse(content: string): string {
  return content.replace(/\n/g, "<br>");
}

export function Response() {
  // Simple string instead of reactive object (which is Vue-specific)
  let chatContent = "";

  async function getResponse(query: string): Promise<string> {
    chatContent = "";
    
    // Fetch configuration dynamically
    const chatConfig = await fetchChatConfig();
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...chatConfig.messages.map((msg: any) => ({
          role: msg.role as "system" | "user" | "assistant",
          content: msg.content
        })),
        {
          role: "user",
          content: query
        }
      ],
      model: chatConfig.model,
      temperature: chatConfig.temperature,
      max_completion_tokens: chatConfig.max_completion_tokens,
      top_p: chatConfig.top_p,
      stream: chatConfig.stream,
      stop: chatConfig.stop,
    });

    let fullResponse = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for await (const chunk of chatCompletion as any) {
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