"use client";
import Note from "./notes";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      fetch("/api/note", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the request headers to indicate JSON format
        },
      })
        .then((res) => {
          setLoading(true);
          return res.json();
        }) // Parse the response data as JSON
        .then((data) => {
          setData(data);
          setLoading(false);
        }); // Update the state with the fetched data
    }, []);
    const handleDeleteNote = () => {
      fetch("/api/note", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the request headers to indicate JSON format
        },
      })
        .then((res) => {
          setLoading(true);
          return res.json();
        }) // Parse the response data as JSON
        .then((data) => {
          setData(data);
          setLoading(false);
        }); // Update the state with the fetched data
    };

    return (
      <div className="py-3">
        <h1 className="text-5xl font-bold text-center">List of notes:</h1>
        {isLoading ? (
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Loading</span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex flex-row flex-wrap space-x-2.5 space-y-2.5">
          {data.map((note, index) => {
            return (
              <>
                <div key={index}>
                  <Note
                    note_id={note.note_id}
                    title={note.title}
                    content={note.content}
                    handleDeleteNote={handleDeleteNote}
                  ></Note>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1> Please Login or Signup </h1>
      </div>
    );
  }
}
