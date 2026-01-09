
import { GoogleGenAI } from "@google/genai";
import { ImageStyle, AspectRatio } from "../types";

const API_KEY = process.env.API_KEY || "";

export const improvePrompt = async (userPrompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following to English if it's in Bengali, then enhance it to be a professional, extremely detailed AI image generation prompt. 
    Focus on lighting, textures, and artistic style. 
    Return ONLY the enhanced English prompt.
    Prompt: "${userPrompt}"`,
    config: {
      temperature: 0.8,
      maxOutputTokens: 250,
    }
  });
  return response.text?.trim() || userPrompt;
};

export const generateAIImage = async (
  prompt: string, 
  style: ImageStyle, 
  aspectRatio: AspectRatio
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const stylePrompt = `Masterpiece, high quality, ${style} style, ${prompt}`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: stylePrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("ইমেজ জেনারেট করতে ব্যর্থ হয়েছে।");
};
