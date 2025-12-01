import { GoogleGenAI } from "@google/genai";
import { GenerationResult, Source } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey });

export const generateContent = async (prompt: string): Promise<GenerationResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure the environment variable.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No content generated.";
    
    // Extract grounding chunks (sources)
    let sources: Source[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      sources = chunks
        .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
        .map((chunk: any) => ({
          uri: chunk.web.uri,
          title: chunk.web.title
        }));
    }

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};
