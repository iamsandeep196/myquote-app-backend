import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HomeIcon } from "lucide-react";
import BottomNavbar from "./BottomNavbar";


function Sidebar() {
  const [userData,setUserData] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/auth/myprofile",
        {
          method : "GET",
          headers : {
            "Content-Type":"application/json"
          },
          credentials : "include"
        }
      )

      const data = await response.json();
      // console.log(data);
      setUserData(data.profile);
      // console.log("After set ",userData);
    
      
    }
    fetchUser();
  },[])

  useEffect(()=>{
    // console.log("check " , userData)
  },[userData])






  return (
    <>
      <div
        className="
    w-full
    bg-base-200
    p-4 sm:p-6
    flex flex-col
    min-w-0
  "
      >
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
              <img
                src={userData?.userProfilePic || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                alt="profile"
              />
            </div>
          </div>

          <h2 className="mt-4 text-2xl font-bold ">{userData?.userName}</h2>

          <p className="text-sm text-center opacity-70 mt-1">{userData?.userBio}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-base-300 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">{userData?.userPosts}</h3>
            <p className="text-xs opacity-70">Posts</p>
          </div>

          <div className="bg-base-300 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">{userData?.userFollowers}</h3>
            <p className="text-xs opacity-70">Followers</p>
          </div>

          <div className="bg-base-300 rounded-xl p-3 text-center">
            <h3 className="font-bold text-lg">{userData?.userFollowings}</h3>
            <p className="text-xs opacity-70">Following</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-10 flex flex-row gap-3">
          <Link to={`/profile/${userData?.user_id}`} className="btn btn-ghost justify-start">
            <CgProfile />
            Profile
          </Link>

          <Link to="/create-post" className="btn btn-ghost justify-start">
            <FaPlus />
            Create Post
          </Link>

          <Link to="/create-post" className="btn btn-ghost justify-start">
            <FaHome />
            Home
            
          </Link>
          <BottomNavbar/>
        </div>
      </div>
     
    </>
  );
}

export default Sidebar;
