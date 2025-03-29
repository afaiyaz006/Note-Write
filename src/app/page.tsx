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
          src: "https://fastly.picsum.photos/id/267/536/354.jpg?hmac=zVch2Xc4A7TDu19qPBFQxet0q1gXDc3aUr4zEUbs1Ec",
          alt: "Random image",
        }}
      />
    </>
  );
}
