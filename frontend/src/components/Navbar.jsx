import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react"



function Navbar({quote}) {
  const navigate = useNavigate();

  const [user , setUser] = useState(null);

  useEffect(() => {
    
    const getUser = async () => {
      const res = await fetch("http://localhost:3000/api/auth/myprofile",
        {
          method:"GET",
          credentials: "include"
        }
      )
      const data = await res.json();
      console.log(data)
      setUser(data.profile.userProfilePic)
      console.log(user)
    }

    getUser();

  },[])


async function handleLogout(){

  try {
    const response = await fetch("http://localhost:3000/api/auth/logout",
      {
        method:"POST",
        credentials:"include"
      }
    )

    const data = await response.json();
    if(data.success){
      toast.success(data.message);
      console.log(data)

      navigate("/login",{replace:true});
      
    }

  }
  catch(error) {

    toast.error(error.data.message);

  }
}


  return (
    <>
      <div className="navbar bg-success shadow-sm sticky top-0 z-50 px-4">
        {/* Left */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">MyQuote</a>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-56"
          />

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src={user || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>

              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow bg-base-100 rounded-box w-52 right-0"
            >
              <li className="mb-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full"
                />
              </li>

              <li>
                <a>Profile</a>
              </li>

              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
