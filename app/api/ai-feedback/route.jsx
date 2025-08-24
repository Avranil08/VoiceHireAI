import { FEEDBACK_PROMPT } from "@/services/Constants";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req){
    try{
    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(FINAL_PROMPT);
    
    let responseText = result.response.text();

    // Clean the response
    responseText = responseText.replace(/```json\n?|```/g, '').trim();

    // Parse the cleaned string as JSON
    const parsedResponse = JSON.parse(responseText);

    console.log(parsedResponse);


    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error("Gemini Error:", e);
    return new Response(JSON.stringify({ error: "Failed to generate feedback" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
