"use client"
import React, {  useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
const postBlog=async ({title,description}:{title:string, description:string})=>{
    const res=fetch("http://localhost:3000/api/blog",{method:'POST',body:JSON.stringify({title,description}),"Content-Type":"application/json",});
    return (await res).json();
}

const AddBlog = () => {
    const router=useRouter();
    const titleRef=useRef<HTMLInputElement | null>(null);
    const descriptionRef=useRef<HTMLTextAreaElement | null>(null);
    const handleSubmit= async(e:any)=>{


        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("Sending Request",{id:"1"})
            await postBlog({title:titleRef.current?.value,
                description:descriptionRef.current?.value});
        }
        toast.success("Blog post Successfully",{id:"1"});
        router.push("/");

    }
  return (
   <>
    <Toaster/>
    <div className='w-full m-auto flex my-4'>
        <div className='flex flex-col justify-center items-center m-auto'>
            <p className='text-2xl text-slate-200 font-bold p-3 '> Add a wonderful blog </p>
            <form onSubmit={handleSubmit}>
                <input ref={titleRef} type='text' placeholder='Enter title' className='rounded-md px-4 py-2 my-2 w-full'/>
                <textarea ref={descriptionRef} placeholder='Enter description' className='rounded-md px-4 w-full my-2'/>
                <button className='font-semibold py-2 px-4 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-50'>
                    Submit
                </button>

            </form>    
        </div>
    </div>
   </>
  )
}

export default AddBlog