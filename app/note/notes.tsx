'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default  function Note(note) {
  
  const {note_id,title,content,handleDeleteNote}=note
  const router = useRouter()
  const [deleteflag,setDeleteFlag]=useState(false)
  const handleDelete=async ()=>{
    const response=await fetch('/api/note/delete/'+note_id)
    if(response.ok){
      handleDeleteNote()
      console.log("DELETED")
      setDeleteFlag(true)
    }
    else{
      console.log("ERROR")
    }
  }
  return (

      <>
      
      <div className="card w-96 bg-base-100 shadow-xl p-0.5">
        {deleteflag?<div role="alert" className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Deleted</span>
          </div>:<div></div>}
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          
          <div className="card-actions">
            <button className="btn btn-primary btn-sm" onClick={() => { router.replace(`/note/${note_id}`)}}>
              View
            </button>
            <button className="btn btn-primary btn-sm" onClick={()=>{router.replace(`note/edit-note/${note_id}`)}}>
              Edit
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDelete}>
              Delete
            </button>
            
          </div>
        </div>
      </div>
      </>
  );
}
