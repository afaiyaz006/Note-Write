"use client";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
export default function Page(req, { params }) {
  const searchParams = useSearchParams();
  const note_content = searchParams.get("note");

  const { messages, input, initialInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/ai",
      initialMessages: [
        {
          role: "user",
          content: note_content,
        },
      ],
    });

  return (
    <>
      <div className="grid-col-1 ml-10 mr-10">
        {messages.length > 1 ? (
          messages.slice(1).map((m) => (
            <div className="chat chat-start">
              <div
                key={m.id}
                className={
                  m.role == "user"
                    ? "chat-bubble chat-bubble-primary"
                    : "chat-bubble chat-bubble-secondary"
                }
              >
                {m.content}
              </div>
            </div>
          ))
        ) : (
          <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Your note is recieved.You can now begin conversation.</h2>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row p-3">
            <textarea
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              className="textarea textarea-primary h-full w-full my-3"
            ></textarea>
            <button className="btn my-5 mx-2">Talk</button>
          </div>
        </form>
      </div>
    </>
  );
}
