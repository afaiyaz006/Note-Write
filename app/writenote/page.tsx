'use client'
import { useSession } from "next-auth/react";
import WriteNote from "./writenote";
import { FormEvent, useState } from "react";
export default function Page() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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

    
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (session){
 

    return (
      <>
      <div>{isLoading ? 'Loading...' : ''}</div>
      <form onSubmit={onSubmit} className="border border-gray-200 rounded-lg shadow">
        
        <WriteNote></WriteNote>
        
      </form>
      </>
    );
  }
}
