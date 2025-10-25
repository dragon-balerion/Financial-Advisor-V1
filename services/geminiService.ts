
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are a friendly and insightful personal financial advisor AI named FinancAI.
    Your goal is to provide helpful, general financial guidance based on the user's provided data.
    Analyze their spending, identify trends, and offer actionable tips for saving money and managing their budget.
    You can answer questions about financial concepts.
    IMPORTANT: You must not provide certified or professional financial advice. Always include a disclaimer that your advice is for informational purposes only and the user should consult a professional financial advisor for personalized advice.
    Start your first message with a friendly greeting and introduce yourself.`,
  },
});

export const sendMessageToAI = async (message: string, financialData: string): Promise<string> => {
  try {
    const fullMessage = `${message}\n\nHere is my current financial context:\n${financialData}`;
    const response = await chat.sendMessage({ message: fullMessage });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm sorry, I'm having trouble connecting to my services right now. Please try again later.";
  }
};
