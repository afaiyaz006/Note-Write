"use client";
import React, { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, Theme } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// interface Note {
//   id: string;
//   title: string;
//   content: PartialBlock[] | undefined | "loading";
// }
export default function Page() {
  //theme config
  const lightTheme: Theme = {
    colors: {
      editor: {
        text: "#1A1A2E",
        background: "#F5F5FA",
      },
    },
  };
  //hooks
  const router = useRouter();
  const params = useParams();
  const noteId = params.id;

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [buttonLoading, setButtonLoading] = useState(false);
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);
  //auth session
  const { data: session, isPending } = authClient.useSession();

  // effects and submission function
  useEffect(() => {
    async function getNote(noteId: string) {
      try {
        const response = await axios.get(`/api/note?noteId=${noteId}`);
        const note = response.data;
        setDocumentTitle(note.title);
        setInitialContent(note.content);
      } catch {
        router.push("/");
      }
    }
    getNote(noteId as string);
  }, []);
  const handleSubmission = async () => {
    try {
      setButtonLoading(true);
      await axios.put(`/api/note?noteId=${noteId}`, {
        title: documentTitle,
        content: editor?.document,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (isPending || editor === undefined) {
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
            className="w-full md:w-full sm:w-auto text-2xl font-bold"
          />
          <div className="flex gap-2">
            <Button
              className="min-w-[100px]"
              onClick={handleSubmission}
              disabled={buttonLoading}
            >
              {buttonLoading ? <Loader2 className="animate-spin" /> : "Update"}
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
