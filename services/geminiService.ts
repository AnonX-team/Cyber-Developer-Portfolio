
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export const getGeminiResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 800,
        tools: [{ googleSearch: {} }] // Pro Feature: Real-time search grounding
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that request.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    // If search results exist, append them as citations
    let citations = "";
    if (chunks && chunks.length > 0) {
      citations = "\n\nSources:\n" + chunks
        .filter(c => c.web)
        .map(c => `- ${c.web?.title}: ${c.web?.uri}`)
        .join("\n");
    }

    return text + citations;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the security mainframe. Please try again later.";
  }
};
