import React from "react";
import { X } from "lucide-react";

function EditModal({onClose}) {


  return (
     <div data-theme="cupckae" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-200"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-bold">
          Edit Profile
        </h2>

        {/* Form */}
        <form className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-1 block font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="mb-1 block font-medium">
              Bio
            </label>
            <textarea
              rows="4"
              placeholder="Write something..."
              className="w-full rounded-lg border p-3 outline-none focus:border-black"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-neutral"
            >
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default EditModal;
