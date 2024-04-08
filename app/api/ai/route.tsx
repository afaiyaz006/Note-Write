import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";


const groq = new OpenAI({
	apiKey: process.env.GROQ_API_KEY!,
	baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
	
  ///console.log(req)
	const { messages } = await req.json();
	//if (!prompt) return new Response("Prompt is required", { status: 400 });

	const response = await groq.chat.completions.create({
		model: "mixtral-8x7b-32768",
		stream: true,
		messages: [
      {
        "role": "system",
        "content": "You are a curious friendly AI assistant that sees user notes and conduct meaningful conversation about it with the user.You are respectful and therapeutic."
      },
      ...messages
    ],
	});
  ///console.log(response)

	const stream = OpenAIStream(response);
	
  return new StreamingTextResponse(stream);
}