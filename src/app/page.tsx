"use client";
import { Hero1 } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero1
        badge="Jump to manage notes"
        heading="Note Write"
        description="Write notes or whatever.."
        image={{
          src: "https://i.ibb.co/rGD0NVZJ/Chat-GPT-Image-Mar-30-2025-05-15-01-PM.png",
          alt: "Random image",
        }}
      />
    </>
  );
}
