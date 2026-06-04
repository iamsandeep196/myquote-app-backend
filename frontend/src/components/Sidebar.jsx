import React from 'react'
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

   const user = {
    name: "Vikash",
    bio: "Fashion Designer",
    profilePic:
      "https://ik.imagekit.io/jqykinrd5/tanjiro_9A3qEXQql.jpg",
    posts: 24,
    followers: 120,
    following: 80,
  };

  return (
    <>
    <div
  className="
    w-full
    sm:w-80
    lg:w-72
    bg-base-300
    p-5
    border-r
    border-base-content/10
  "
>
  {/* Profile */}
  <div className="flex flex-col items-center">
    <img
      src={user.profilePic}
      alt="profile"
      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary"
    />

    <h2 className="mt-3 text-lg md:text-xl font-bold">
      {user.name}
    </h2>

    <p className="text-sm opacity-70 text-center">
      {user.bio}
    </p>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-2 mt-6 text-center">
    <div className="bg-base-200 rounded-lg p-2">
      <h3 className="font-bold">{user.posts}</h3>
      <p className="text-xs">Posts</p>
    </div>

    <div className="bg-base-200 rounded-lg p-2">
      <h3 className="font-bold">{user.followers}</h3>
      <p className="text-xs">Followers</p>
    </div>

    <div className="bg-base-200 rounded-lg p-2">
      <h3 className="font-bold">{user.following}</h3>
      <p className="text-xs">Following</p>
    </div>
  </div>

  {/* Menu */}
  <div className="mt-8 flex flex-col gap-3">
    <Link
      to="/"
      className="btn btn-ghost justify-start"
    >
      <FaHome />
      Home
    </Link>

    <Link
      to="/create"
      className="btn btn-primary"
    >
      <FaPlus />
      Create Post
    </Link>
  </div>

  {/* Logout */}
  <div className="mt-8">
    <button className="btn btn-error w-full">
      <FaSignOutAlt />
      Logout
    </button>
  </div>
</div>
    </>
  )
}

export default Sidebar