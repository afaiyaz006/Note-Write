import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


const groq = new OpenAI({
	apiKey: process.env.GROQ_API_KEY!,
	baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
	
  ///console.log(req)
  const session = await getServerSession(authOptions);
  if (session) {
	const { messages } = await req.json();
	

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
}