import Groq from "groq-sdk";
import axios from "axios";
import { locationService, LocationData, PolygonData } from './locationService';
import { formatButuanContextForAI, getNearbyPOIs, analyzeBusinessOpportunity } from '../data/staticAiMemory';

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



// Interface for lot analysis data
export interface LotAnalysisData {
  location?: LocationData | null;
  polygonCoordinates?: Array<{ lat: number; lng: number }>;
  lotSize?: string;
  capital?: string;
  operatingHours?: string;
}

// Enhanced analysis function with location intelligence
export async function analyzeLotWithLocation(data: LotAnalysisData): Promise<string> {
  try {
    let locationData: LocationData;
    let polygonData: PolygonData | undefined;
    
    // Get accurate location data
    if (data.location && data.location.lat && data.location.lng) {
      locationData = data.location;
    } else {
      locationData = await locationService.getCurrentLocation();
    }
    
    // Process polygon data if available
    if (data.polygonCoordinates && data.polygonCoordinates.length >= 3) {
      polygonData = locationService.calculatePolygonData(data.polygonCoordinates);
    }
    
    // Use static Butuan data for realistic local context
    const butuanContext = formatButuanContextForAI(
      { lat: locationData.lat, lng: locationData.lng }, 
      2000
    );
    
    // Get nearby POIs from static data
    const nearbyPOIs = getNearbyPOIs(locationData.lat, locationData.lng, 2000);
    
    // Create comprehensive location context for AI
    const locationContext = locationService.formatLocationForAI(locationData, polygonData, nearbyPOIs);
    
    // Get business opportunity analysis based on capital range
    const capitalNum = parseInt(data.capital?.replace(/[^0-9]/g, '') || '0');
    let businessCategory = 'services';
    if (capitalNum >= 1000000) businessCategory = 'restaurant';
    else if (capitalNum >= 500000) businessCategory = 'retail';
    else if (capitalNum >= 100000) businessCategory = 'food_truck';
    
    const opportunityAnalysis = analyzeBusinessOpportunity(businessCategory);
    
    // Build comprehensive analysis query with Butuan-specific data
    const analysisQuery = `
Analyze this business lot opportunity in Butuan City, Philippines with the following details:

${butuanContext}

LOCATION DETAILS:
${locationContext}

BUSINESS DETAILS:
- Investment Capital: ${data.capital || 'Not specified'}
- Operating Hours: ${data.operatingHours || 'Not specified'}
- Specified Lot Size: ${data.lotSize || 'Not specified'}

MARKET OPPORTUNITY ANALYSIS:
- Business Category Suitability: ${opportunityAnalysis.suitability}/10
- Competition Level: ${opportunityAnalysis.competition}
- Market Potential: ${opportunityAnalysis.marketPotential}
- Key Recommendations: ${opportunityAnalysis.recommendations.join('; ')}

Please provide a comprehensive business viability analysis specifically for Butuan City including:

1. **LOCATION ANALYSIS**
   - Accessibility from major roads and transportation hubs
   - Foot traffic patterns based on nearby establishments
   - Demographics of the immediate area
   - Proximity advantages to key facilities (schools, malls, government offices)

2. **MARKET OPPORTUNITIES**
   - Analysis of nearby businesses and competition
   - Target market identification based on local demographics
   - Seasonal business patterns and tourism impact
   - Student market potential from nearby universities

3. **INVESTMENT RECOMMENDATIONS**
   - ROI potential specific to Butuan market conditions
   - Break-even analysis considering local costs
   - Recommended business types for the given capital
   - Phased development approach

4. **OPERATIONAL CONSIDERATIONS**
   - Local suppliers and logistics considerations
   - Utilities and infrastructure availability
   - Permit requirements specific to Butuan City
   - Staffing considerations and local labor market

5. **RISK ASSESSMENT**
   - Weather and seasonal risks (typhoon season)
   - Economic risks specific to the region
   - Competition risks from established businesses
   - Regulatory and compliance considerations

6. **GROWTH POTENTIAL**
   - Expansion possibilities within Butuan
   - Scalability to other parts of Caraga region
   - Tourism market development opportunities
   - Digital transformation potential

Consider Butuan's role as a regional center, the local Butuanon culture, and specific opportunities in the Caraga region.`;

    return await getAIResponse(analysisQuery);
    
  } catch (error) {
    console.error('Location-based analysis error:', error);
    
    // Fallback to basic analysis without location intelligence
    const basicQuery = `Analyze this business lot with capital: ${data.capital}, operating hours: ${data.operatingHours}, lot size: ${data.lotSize}`;
    return await getAIResponse(basicQuery);
  }
}

// Core AI response function
async function getAIResponse(query: string): Promise<string> {
  const chatConfig = await fetchChatConfig();
  
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      ...chatConfig.messages.map((msg: { role: string; content: string }) => ({
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
  
  if (chatConfig.stream) {
    // Handle streaming response
    const stream = chatCompletion as unknown as AsyncIterable<{ choices: Array<{ delta: { content?: string } }> }>;
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
    }
  } else {
    // Handle non-streaming response
    const response = chatCompletion as { choices: Array<{ message: { content: string } }> };
    fullResponse = response.choices[0]?.message?.content || "";
  }
  
  return fullResponse;
}

export function Response() {
  // Simple string instead of reactive object (which is Vue-specific)
  let chatContent = "";

  async function getResponse(query: string): Promise<string> {
    chatContent = "";
    return await getAIResponse(query);
  }

  return {
    chatContent,
    getResponse,
  };
}