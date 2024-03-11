'use client'

import { useRouter } from "next/navigation";


export default  function Note(note) {
  
  const {note_id,title,content,handleDeleteNote}=note
  const router = useRouter()
  const handleDelete=async ()=>{
    const response=await fetch('/api/note/delete/'+note_id)
    if(response.ok){
      handleDeleteNote()
      console.log("DELETED")
    }
    else{
      console.log("ERROR")
    }
  }
  return (

      <>
      <div className="card w-96 bg-base-100 shadow-xl p-0.5">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
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
