'use client'
import { useChat } from "ai/react";
import Script from 'next/script'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'



export default function Page() {
  

  if(Cookies.get('note')){
    const note_content=Cookies.get('note')
 
  const { messages, input, initialInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/ai",
      id:1,
      initialInput:'note provided.',
      initialMessages: [
        {
          role: "user",
          content: note_content,
        },
      ],
    });
  
  return (
    <>
      <div className="grid-col-1 ml-10 mr-10" suppressHydrationWarning>
        <div className="card w-96 bg-black text-primary-content" suppressHydrationWarning>
            <div className="card-body" suppressHydrationWarning>
              <h2 className="card-title" suppressHydrationWarning>Your note is recieved: </h2>
              <article dangerouslySetInnerHTML={{ __html: note_content }} suppressHydrationWarning>
               
              </article>
            </div>
          </div>
        {messages.length > 1 ? (
        
          messages.slice(2).map((m) => (
            <div className="chat chat-start" suppressHydrationWarning>
              <div
                key={m.id}
                className={
                  m.role == "user"
                    ? "chat-bubble chat-bubble-primary"
                    : "chat-bubble chat-bubble-secondary"
                }
                suppressHydrationWarning>
                {m.content}
              </div>
            </div>
          ))
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit} suppressHydrationWarning>
          <div className="flex flex-row p-3" suppressHydrationWarning>
            <textarea
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              className="textarea textarea-primary h-full w-full my-3"
              suppressHydrationWarning
            ></textarea>
            <button className="btn my-5 mx-2" id="talk" suppressHydrationWarning>Talk</button>
          </div>
        </form>
        
      </div>
      <Script id="show-banner" >
          {`c=0;if((document.readyState === "complete" || document.readyState === "interactive") && c==0){document.getElementById('talk').click();c=1;}`}
      </Script>
    </>
  );
}
}
