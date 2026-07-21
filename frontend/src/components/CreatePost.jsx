import React, { useEffect, useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";
import API_URL from "../api/api";

function CreatePost() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    quote: "",
    backgroundImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "backgroundImage") {
      setFormData({
        ...formData,
        backgroundImage: e.target.files[0],
      });
    } else {
      setFormData({
        quote: "",
        [e.target.name]: e.target.value,
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const sendData = new FormData();
      sendData.append("text", formData.quote);
      sendData.append("image", formData.backgroundImage);

      const response = await fetch(`${API_URL}/api/quotes/create`, {
        method: "POST",
        credentials: "include",
        body: sendData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          quote: "",
          backgroundImage: null,
        });

        fileInputRef.current.value = "";
        navigate("/quotes");
      }
    } catch (error) {
      toast.error(data.error);
    }
  }

  useEffect(() => {
    document.title = "Create Post | MyQuote"
  })

  return (
    <>
      <Navbar />

      <div
        data-theme="forest"
        className="h-[calc(100vh-64px)] flex justify-center items-center bg-base-200 px-4 overflow-hidden"
      >
        <div className="w-full max-w-md bg-base-100 p-6 sm:p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Create New Post
          </h1>

          <div className="mt-8 flex flex-col gap-5">
            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-32 resize-none"
              placeholder="Write your Quote here..."
            />

            <input
              ref={fileInputRef}
              name="backgroundImage"
              onChange={handleChange}
              type="file"
              className="file-input file-input-bordered w-full"
            />

            <button onClick={handleSubmit} className="btn btn-neutral w-full">
              Create Post
            </button>
          </div>
        </div>
      </div>
      {/* Bottom navbar button */}
      <BottomNavbar />
    </>
  );
}

export default CreatePost;
