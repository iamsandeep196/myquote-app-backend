import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import API_URL from "../api/api";

function Navbar({ quote }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API_URL}/api/auth/myprofile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data)
      setUser(data.profile.userProfilePic);
      // console.log(user)
    };

    getUser();
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        console.log(data);

        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <>
      <div
        data-theme="forest"
        className="navbar shadow-sm sticky top-0 z-50 px-4"
      >
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
                  src={
                    user ||
                    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"}> Profile </Link>
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
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost hover:bg-green-800 transition-all duration-200"
            >
              <Menu size={24} />
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-36 rounded-2xl border  bg-base-100 p-2 shadow-2xl"
            >
              <li>
                <Link
                  to="/profile"
                  className="rounded-xl py-3 hover:bg-green-800 transition-colors"
                >
                  👤 Profile
                </Link>
              </li>

              <div className="my-1 border-t border-green-700"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-xl py-3 text-red-400 hover:bg-red-900/30 hover:text-red-300"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
