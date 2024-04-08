'use client'
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import DOMPurify from 'dompurify';
// dynamic imports must be outside export functions
// other wise for each refresh the Custom editor component will rerender

const CustomEditor = dynamic(()=>{
  return import( '../components/CKEditorComponent' );
}, { ssr: false} );
export default function Page() {
 
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPublished,setIsPublished]=useState<boolean>(false)
  const [content,setContent]=useState('')
  
  ///console.log(CustomEditor['data'])
  //console.log(content)
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts
    
    try {
      const formData = new FormData(event.currentTarget)
      const santizedContent = DOMPurify.sanitize(content); //xss protection
      ///console.log(santizedContent)
      formData.append('content',santizedContent) 
    
      //console.log(formData['content'])
      const response = await fetch('/api/writenote', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      else if(response.ok){
        setIsPublished(true)
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
  var publishAlert=()=>{return (<div></div>)}
  if(isPublished){
    publishAlert=()=>{
      
      return (
      <div role="alert" className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Note published!</span>
      </div>
      )
    }
  }
  if (session){
 

    return (
      <>
      <div>{publishAlert()}</div>
      <div>{isLoading ? 'Loading...' : ''}</div>
      <form onSubmit={onSubmit} className="border border-gray-200 rounded-lg shadow">
      <label className="flex flex-row content-center ml-20 mr-20 my-3">Title</label>
      <div className="flex flex-row content-center ml-20 mr-20">
        <input
          type="text"
          placeholder="Title here"
          className="input input-bordered w-full max-w-xs"
          id="title"
          name="title"
        />
      </div>
      
      <label className="flex flex-row content-center ml-20 mr-20 my-3">Body</label>
      <div className="grid-cols-1 ml-20 my-3">
      
      <CustomEditor
      initialData={content}
      setContent={setContent}
      className="p-3"
     
      />
      </div>
      <div className="flex flex-row w-full place-content-center px-3 my-3">
        <button className="btn glass">Publish Note</button>
      </div>  
      </form>
      <style>{`.ck-editor__editable_inline { min-height: 200px;} .ckeContainer {margin:3px;}`}</style>
      
      </>
    );
  }
  else{
    redirect("/")
  }
}

