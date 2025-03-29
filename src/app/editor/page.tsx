"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import SpinnerCircle from "../../components/ui/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Page() {
  const lightTheme: Theme = {
    colors: {
      editor: {
        text: "#1A1A2E",
        background: "#F5F5FA",
      },
    },
  };

  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [buttonLoading, setButtonLoading] = useState(false);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "Welcome to Your New Note",
      },
      {
        type: "paragraph",
        content: "Start writing your thoughts here...",
      },
    ],
  });

  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSubmission = async () => {
    try {
      setButtonLoading(true);
      await axios.post("/api/note", {
        title: documentTitle,
        content: editor.document,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen p-4 flex flex-col">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <Input
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full sm:w-auto text-2xl font-bold"
          />
          <div className="flex gap-2">
            <Button
              className="min-w-[100px]"
              onClick={handleSubmission}
              disabled={buttonLoading}
            >
              {buttonLoading ? <Loader2 className="animate-spin" /> : "Publish"}
            </Button>
            <Button className="min-w-[100px]">Share</Button>
          </div>
        </div>
        <BlockNoteView
          editor={editor}
          theme={lightTheme}
          className="border rounded-md min-h-[500px] mt-4 p-2 w-full"
        />
      </div>
    );
  } else {
    router.push("/");
  }
}
