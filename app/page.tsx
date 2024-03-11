"use client";
import { useSession,getProviders,signIn,signOut } from "next-auth/react";
function Login({ session }) {
  if (session) {

    return (
      <>
      <div className="flex flex-col">
        <div className="avatar">
          <div className="w-24 rounded-full center">
            <img src={session["user"]["image"]} />
          </div>
        </div>
        <text> Welcome {session["user"]["name"]} </text>
        <button className="btn btn-primary" onClick={()=>signOut()}>Logout</button>

        </div>


      </>
    );
  } else {
    return (
      <>
        <button className="btn btn-primary" onClick={()=>signIn("github")}>Login With github</button>
      </>
    );
  }
}

export default function Page() {
  const { data: session } = useSession();
  
  return (
    <div className="hero min-h-screen y-3 shadow-2xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://unsplash.com/photos/2q_frVRXWfQ/download?force=true&w=640"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Write Note!</h1>
          <p className="py-6">Write notes or whatever.</p>
          <div className="space-x-5">
            <Login session={session}></Login>
          </div>
        </div>
      </div>
    </div>
  );
}
