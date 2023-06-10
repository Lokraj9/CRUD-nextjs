"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};
const updateBlog = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
    const router=useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    toast.loading("Fetching blog details", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        toast.success("Fetching complete", { id: "1" });
       
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Fetching Blog", { id: "1" });
      });
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
    }
    toast.success("Blog post Successfully", { id: "1" });
    router.push("/");
  };
  const handleDelete = async () => {
    toast.loading("Deleting blog",{id:"2"});
    await deleteBlog(params.id);
    toast.success("Blog Deleted", { id: "2" });
    router.push("/");
  };
  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3 ">
            {" "}
            Edit a wonderful blog{" "}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter title"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter description"
              className="rounded-md px-4 w-full my-2"
            />
            <div className="flex justify-between">
              <button className="font-semibold py-2 px-4 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-50">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold py-2 px-4 shadow-xl bg-red-500 rounded-lg m-auto my-2 hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
