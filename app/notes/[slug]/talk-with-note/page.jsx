"use client";
import { send_message } from "../../../components/GroqAI";
import { StreamingTextResponse } from "ai";


export default function Page() {
  const messages=[]
  return (
    <>
      <div className="grid-col-1 ml-10 mr-10">
        {messages.map(m => (
        <div className="chat chat-start" key={m.id}>
          <div className={m.role === 'user' ? 'chat-bubble  chat-bubble-primary' : 'chat-bubble chat-bubble-secondary'}>
            {m.content}
          </div>
        </div>

        ))}
        
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row p-3">
       
          <textarea value={input} className="textarea textarea-primary h-full w-full my-3" ></textarea>
          <button className="btn my-5 mx-2">Talk</button>
        </div>
        </form>
      </div>
      
    </>
  );
}
