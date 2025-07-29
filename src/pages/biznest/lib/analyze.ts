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
  const response = await axios.get("/data/chatConfig.json");
  console.log("Chat config fetched successfully:", response.data);
  return response.data.chatCompletion;
}



// Function to format AI response text with proper line breaks for markdown-style formatting
export function formatAIResponse(text: string): string {
  return text
    // Add line breaks before and after *** (bold + italic)
    .replace(/\*\*\*/g, '***')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<br/><strong><em>$1</em></strong><br/>')
    // Add line breaks before and after ** (bold)
    
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Clean up multiple consecutive line breaks
    .replace(/(<br\/>){3,}/g, '<br/><br/>')
    // Remove leading line breaks
    .replace(/^(<br\/>)+/, '')
    // Join numbered list lines (e.g., '1.\nText' => '1.Text')
    .replace(/(\d+)\.\n([^\n])/g, '$1.$2')
    // Convert regular line breaks to HTML
    .replace(/\n/g, '<br/>');
}

function formatResponse(content: string): string {
  return content.replace(/\n/g, " ");
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