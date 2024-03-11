"use client";
import Note from "./notes";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";


export default function Page() {
  const { data: session } = useSession();
  if (session) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
      fetch("/api/note", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the request headers to indicate JSON format
        },
      })
        .then((res) => res.json()) // Parse the response data as JSON
        .then((data) => setData(data)); // Update the state with the fetched data
    }, []);
    const handleDeleteNote=()=>{
      
        fetch("/api/note", {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the request headers to indicate JSON format
          },
        })
          .then((res) => res.json()) // Parse the response data as JSON
          .then((data) => setData(data)); // Update the state with the fetched data
      
      
    }  
  
    return (
      <div className="py-3">
        <h1 className="text-5xl font-bold text-center">List of notes:</h1>
        <div className="flex flex-row flex-wrap space-x-2.5 space-y-2.5">
             
        {data.map((note,index)=>{
         
          return (
            <>
             <div key={index}>
                <Note note_id={note.note_id} title={note.title} content={note.content} handleDeleteNote={handleDeleteNote}></Note>
              </div>
            </>
          );
        })}
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}


