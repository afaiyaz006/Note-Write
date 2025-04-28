import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import axios from "axios";
import { auth } from "../../../../auth";
import { headers } from "next/headers";

export const maxDuration = 30;

const groq = createGroq();
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
async function getNotes(username: string, queryContent: any) {
  let texts: string[] = [];

  for (let i = 0; i < queryContent.length; i += 1) {
    const para = queryContent[i].content;

    texts = texts.concat(para);
  }
  console.log(queryContent);
  const response = await axios.post(
    process.env.EMBEDDING_API_URL + "/hf-query",
    {
      user: username,
      query_texts: texts,
    }
  );
  // const documents = response.data.map((res: any) => res.document);
  if (response.status != 200) {
    return "Unable to retrieve any notes";
  }
  const relatedInfos = response.data || "";

  return relatedInfos.join("\n");
}
export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    const context = await getNotes(session.user.name, messages);

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "You are a helpful and friendly AI assistant for a note-taking app. The user has written various notes, and relevant information from those notes is retrieved and provided as context. Your goal is to assist the user by answering questions, summarizing, organizing, or improving their notes while maintaining clarity and relevance. Always respect the user's intent, provide concise yet informative responses, and avoid redundancy. If necessary, ask clarifying questions to ensure accuracy." +
        "Here are some lines from the notes the user has written" +
        session.user.name +
        " based on the query of the user. The lines:  " +
        context,
      messages,
    });

    return result.toDataStreamResponse();
  }
}
