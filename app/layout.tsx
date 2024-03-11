
import type { Metadata } from "next";
import { Bree_Serif } from "next/font/google";
import Navbar from "./navbar";
import "./globals.css";
import { getServerSession } from "next-auth";
import  SessionProvider  from "./components/SessionProvider"

// These styles apply to every route in the application

const breeSerif = Bree_Serif({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Notepad App",
  description: "A simple notepad app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" data-theme="light">
      <body className={breeSerif.className}>
        <div className="container mx-auto py-3">
          <SessionProvider session={session}>
            <Navbar></Navbar>

            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
