import React, { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreatePost() {

    const navigate = useNavigate()

    const fileInputRef = useRef(null);
    const [formData,setFormData] = useState({
        quote:"",
        backgroundImage : null
    });

    const handleChange = (e) => {

        if(e.target.name === "backgroundImage"){
            setFormData({
                ...formData,
                backgroundImage:e.target.files[0],
            })
        }
        else{
            setFormData({
                quote:"",
                [e.target.name]:e.target.value
            })
        }

    }

    async function handleSubmit(e){
        e.preventDefault();
        
        try {



            const sendData = new FormData();
            sendData.append("text",formData.quote);
            sendData.append("image",formData.backgroundImage);

            const response = await fetch("http://localhost:3000/api/quotes/create",{
                method : "POST",
                credentials:"include",
                body : sendData,
            });

            const data = await response.json();

            console.log(data);

            if(data.success){
                toast.success(data.message)
                setFormData({
                    quote:"",
                    backgroundImage:null
                });

                fileInputRef.current.value=""
                navigate("/quotes");
            }

        }
        catch(error){
            console.error(error.message);
            toast.error(data.error);

        }
    }



  return (
    <div
      data-theme="forest"
      className="min-h-screen flex justify-center items-center bg-base-200 px-4"
    >
      <div className="w-full max-w-md bg-base-100 p-6 sm:p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-base-content">
          Create New Post
        </h1>

        <div className="mt-8 flex flex-col gap-5">
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32 resize-none"
            placeholder="Write your Quote here..."
          ></textarea>

          <input
            ref={fileInputRef}
            name="backgroundImage"
            onChange={handleChange}
            type="file"
            className="file-input file-input-bordered w-full"
          />

          <button onClick={handleSubmit} className="btn btn-neutral w-full">Create Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
