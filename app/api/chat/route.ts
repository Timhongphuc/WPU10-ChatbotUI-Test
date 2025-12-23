import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
    // Einfachste Methode: Globalen System-Prompt aus ENV anhängen
    system: process.env.SYSTEM_PROMPT ?? "",
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}