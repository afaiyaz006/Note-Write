'use client'
import { useSession } from "next-auth/react";
import WriteNote from "./writenote";
import { FormEvent, useState } from "react";
export default function Page() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPublished,setIsPublished]=useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)
      //console.log(formData)
      const response = await fetch('/api/writenote', {
        method: 'POST',
        body: formData,
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
        
        <WriteNote></WriteNote>
        
      </form>
      </>
    );
  }
}
