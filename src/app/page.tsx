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
          src: "https://i.ibb.co/wFwHFgvS/4abe1007-f780-4f6e-93b1-2c33f4ad5c40.png",
          alt: "Random image",
        }}
      />
    </>
  );
}
