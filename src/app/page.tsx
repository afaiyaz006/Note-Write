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
          src: "https://i.ibb.co/SXz1NHGJ/note-pad-hero.jpg",
          alt: "Random image",
        }}
      />
    </>
  );
}
