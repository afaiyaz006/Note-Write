"use client";
import React, { useState } from "react";
// import { Navbar1 } from "@/components/navbar";
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
  // Custom light theme with a softer color palette
  const lightTheme: Theme = {
    colors: {
      editor: {
        text: "#1A1A2E",
        background: "#F5F5FA",
      },
    },
  };

  // State for document metadata
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [buttonLoading, setButtonLoading] = useState(false);
  // Creates a new editor instance
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

  // // Authentication hook

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [session, router]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, isPending, error } = authClient.useSession();
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
  // Loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }
  if (session) {
    return (
      <div className="min-h-screen p-4">
        {/* <Navbar1></Navbar1> */}

        {/* Main Content */}
        <div className="flex flex-row ">
          <Input
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            placeholder="Enter note title"
            className="mx-3 text-2xl font-bold"
          />

          <div className="flex justify-end mb-4">
            <Button
              className="mx-2 min-w-[100px]"
              onClick={handleSubmission}
              disabled={buttonLoading}
            >
              {buttonLoading ? <Loader2 className="animate-spin" /> : "Publish"}
            </Button>
            <Button className="mx-2 min-w-[100px]">Share</Button>
          </div>
        </div>
        <BlockNoteView
          editor={editor}
          theme={lightTheme}
          className="border rounded-md min-h-[500px]"
        />
        {/* TODO: editor.document contains all the data just need to save this to database */}
      </div>
    );
  } else {
    router.push("/");
  }
}
