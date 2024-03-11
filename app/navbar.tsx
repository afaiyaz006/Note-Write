"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
function NoteButton({session}) {
  if (session){
  return (
    <>
      <li>
        <Link href="/writenote" className="button">
          Write Note
        </Link>
      </li>

      <li>
        <Link href="/note" className="button">
          notes
        </Link>
      </li>
    
    </>
  );
  }
  else{
    <></>
  }
}
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-md my-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
               <NoteButton session={session}></NoteButton>

          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Note Write</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <NoteButton session={session}></NoteButton>
          
        </ul>
      </div>
    </div>
  );
}
