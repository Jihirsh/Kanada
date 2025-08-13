import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { searchInput, searchResult } = await req.json();

    //initialize the gemini client
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Call Gemini 2.0 Flash directly
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Depends on user input sources, summarize and search about topic. 
Give me markdown text with proper formatting.
User input is: ${searchInput}
Search results: ${JSON.stringify(searchResult)}
      `,
    });

    //get the text output
    const output = response?.output_text || response?.text || "";

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get response from Gemini" },
      { status: 500 }
    );
  }
}
