"use client";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import dynamic from "next/dynamic";

// Dynamically import the Editor component, disabling SSR
const Editor = dynamic(() => import("../../components/editor"), {
  ssr: false, // Prevents server-side rendering
  loading: () => (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle></SpinnerCircle>
      </div>
    </>
  ),
});

export default function EditorPage() {
  return <Editor />;
}
