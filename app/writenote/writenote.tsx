'use client'
export default function WriteNote() {
  
  return (
    <>
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
      <div className="flex flex-row w-mid content-center ml-20 mr-20 my-3">
        <div className="flex-initial w-full">
          <textarea
            className=" textarea-md w-full h-80 rounded-md textarea-bordered border-2 border-transparent-10 dark:placeholder-gray-400"
            placeholder="Write note"
            id="content"
            name="content"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row w-full place-content-center my-3">
        <button className="btn glass" >Publish Note</button>
      </div>
    </>
  );
 
 
}
