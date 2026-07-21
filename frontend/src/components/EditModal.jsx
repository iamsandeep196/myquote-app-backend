import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

function EditModal({ onClose , key , userData}) {

  // console.log(userData);
  const [formData,setFormData] = useState({
    "username":"",
    "userBio": ""
  })

  useEffect(() => {
    if(userData){
      setFormData({
        username : userData.username,
        userBio : userData.userBio
      })
    }
  },[userData])

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:value
    }))
  }




  return (
    <div
      data-theme="forest"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-base-100 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-base-200 transition"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-bold text-base-content">
          Edit Profile
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="mb-2 block font-medium text-base-content">
              Name
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-base-content">
              Bio
            </label>
            <textarea
              name="userBio"
              value={formData.userBio}
              onChange={handleChange}
              rows={4}
              placeholder="Write something..."
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
