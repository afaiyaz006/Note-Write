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
        setLoading(true);
        return res.json();
      }) // Parse the response data as JSON
      .then((data) => {
        setData(data);
        setLoading(false);
      }); // Update the state with the fetched data
  }, [params]);

  return (
    <>
      <div className="card w-full bg-base-100 shadow-2xl">
      {isLoading? <div role="alert" className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Loading...</span>
          </div>:<div></div>}
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
