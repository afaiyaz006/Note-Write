// components/editor.tsx
"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import SpinnerCircle from "../components/ui/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Block, BlockNoteEditor } from "@blocknote/core";

export default function Editor() {
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
  const [isMounted, setIsMounted] = useState(false);

  const editor: BlockNoteEditor | undefined = useCreateBlockNote();
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isPending || !editor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }

  const handleSubmission = async () => {
    if (!editor) {
      console.error("Editor is not initialized");
      return;
    }

    try {
      setButtonLoading(true);
      const content = editor.document;
      await axios.post("/api/note", {
        title: documentTitle,
        content: content as Block[],
      });
      router.push("/notes");
    } catch (error) {
      console.error("Error submitting note:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <Input
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          placeholder="Enter note title"
          className="w-full md:w-full sm:w-auto text-2xl font-bold"
        />
        <div className="flex gap-2">
          <Button
            className="min-w-[100px]"
            onClick={handleSubmission}
            disabled={buttonLoading || !editor}
          >
            {buttonLoading ? <Loader2 className="animate-spin" /> : "Publish"}
          </Button>
          <Button className="min-w-[100px]">Share</Button>
        </div>
      </div>
      {isMounted && editor ? (
        <BlockNoteView
          formattingToolbar={true}
          editor={editor}
          theme={lightTheme}
          className="border rounded-md min-h-[500px] mt-4 p-2 w-full"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[500px] mt-4">
          <SpinnerCircle />
        </div>
      )}
    </div>
  );
}
