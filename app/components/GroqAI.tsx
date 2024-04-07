"use strict";
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function send_message(msg:string) {
  const chatCompletion = await getGroqChatCompletion(msg);
  //  Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content || "";
}
async function getGroqChatCompletion(msg:string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a curious friendly AI assistant that sees user notes and conduct meaningful conversation about it with the user.You are respectful and therapeutic."

            },
            {
                role:'user',
                content:'I have written this note'
            }
        ],
        model: "mixtral-8x7b-32768"
    });
}
module.exports = {
  getGroqChatCompletion,
  send_message
};
