'use client'
import { FormEvent, useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const note_id_slug = params["slug"];
  const [newNoteTitle,setNewNoteTitle]=useState('')
  const [newNoteContent,setNewNoteContent]=useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)
      //console.log(formData)
      const response = await fetch('/api/note/edit/'+note_id_slug, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

    
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }





  const handleTitleChange = (event) => {
    setNewNoteTitle(event.target.value);
  };
  const handleContentChange=(event)=>{
    setNewNoteContent(event.target.value);
  }


  if (parseInt(note_id_slug) >= 0) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/note/" + note_id_slug, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the request headers to indicate JSON format
          },
        })
          .then((res) => {
            return res.json();
          }) // Parse the response data as JSON
          .then((data) => {
            setNewNoteTitle(data[0].title)
            setNewNoteContent(data[0].content)
            setData(data);
          }); // Update the state with the fetched data
      }, [note_id_slug]);

    //const note_title=data.map((note)=>{ return note.title})
    //const note_content=data.map((note)=>{ return note.content})
    return (
      <>
      <form onSubmit={onSubmit} className="border border-gray-200 rounded-lg shadow">
        <label className="flex flex-row content-center ml-20 mr-20 my-3">
          Title
        </label>
        <div className="flex flex-row content-center ml-20 mr-20">
          <input
            type="text"
            placeholder="Title here"
            className="input input-bordered w-full max-w-xs"
            id="title"
            name="title"
            value={newNoteTitle}
            onChange={handleTitleChange}
          />
        </div>
        <label className="flex flex-row content-center ml-20 mr-20 my-3">
          Body
        </label>
        <div className="flex flex-row w-mid content-center ml-20 mr-20 my-3">
          <div className="flex-initial w-full">
            <textarea
              className=" textarea-md w-full h-80 rounded-md textarea-bordered border-2 border-transparent-10 dark:placeholder-gray-400"
              placeholder="Write note"
              id="content"
              name="content"
              value={newNoteContent}
              onChange={handleContentChange}
            ></textarea>
          </div>
        </div>
        
        <div className="flex flex-row w-full place-content-center my-3">
          <button className="btn glass" >Edit Note</button>
        </div>
        </form>
      </>
    );
  }
}