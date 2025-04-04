"use client";

import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { authClient } from "@/lib/auth-client";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, isPending } = authClient.useSession();
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();
  const router = useRouter();
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }
  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-2 sm:p-4 md:p-6">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-center">Chat with Your notes</CardTitle>
          </CardHeader>

          <CardContent className="h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-y-auto p-3 md:p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                Send a message to start the conversation
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "user" ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {status === "streaming" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t p-3 md:p-4">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow py-3"
                disabled={status === "streaming"}
              />
              <Button
                type="submit"
                size="icon"
                disabled={status === "streaming" || input.trim() === ""}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    router.push("/");
  }
}
