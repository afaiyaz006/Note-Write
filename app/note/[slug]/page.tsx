"use client";
import { integer } from "drizzle-orm/pg-core";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //console.log(parseInt(params['slug']))
  useEffect(() => {
    fetch("/api/note/" + params["slug"], {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => {
        return res.json();
      }) // Parse the response data as JSON
      .then((data) => {
        setData(data);
      }); // Update the state with the fetched data
  }, [params]);

  return (
    <>
      <div className="card w-full bg-base-100 shadow-2xl">
        <div className="card-body">
          
          {data.length>0 ? data.map((value, index) => {
            return (
                <>
                <div key={index}>
                <h2 className="card-title">{value.title}</h2>
                <p>{value.content}</p>
                </div>
                </>
            );
          }):<h1>Nothing here but crickets</h1>}
        </div>
      </div>
    </>
  );
}
