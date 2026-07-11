import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditModal from "../components/EditModal";
import BottomNavbar from "../components/BottomNavbar";

function ProfilePage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    // document.title = "Profile | MyQuote"
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setLoggedInUser(data.user);
        // console.log("this is current user data",loggedInUser);
        if(user?.username){
          document.title = `${user?.username} | MyQuote`
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  });

  useEffect(
    () => {
      try {
        const fetchUserData = async () => {
          const response = await fetch(
            `http://localhost:3000/api/auth/user/profile/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            },
          );

          const data = await response.json();
          console.log(data);
          setUser(data.userData);
          setUserPosts(data.userData.userQuotes);

          // console.log(userPosts);
        };
        fetchUserData();
      } catch (error) {
        console.error(error);
      }
    },
    [id],
    [userPosts],
  );

  // useEffect(() => {
  //   console.log(userPosts);
  // }, [userPosts]);

  return (
    <>
      <Navbar />
      <div
        data-theme="forest"
        className="min-h-screen px-4 py-4 overflow-x-hidden"
      >
        {/* Top Section */}
        <div className="flex items-center gap-6">
          {/* Profile Pic */}
          <div className="avatar">
            <div className="w-24 sm:w-32 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
              <img
                src={
                  user?.userProfile ||
                  "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">{user?.username}</h2>

            <div className="flex gap-6 mt-3">
              <div className="text-center">
                <span className="font-bold">{user?.userPosts}</span>
                <p className="text-sm">Posts</p>
              </div>

              <div className="text-center">
                <span className="font-bold">{user?.userFollowers}</span>
                <p className="text-sm">Followers</p>
              </div>

              <div className="text-center">
                <span className="font-bold">{user?.userFollowings}</span>
                <p className="text-sm">Following</p>
              </div>
            </div>

            {/* Edit profile button */}
            {loggedInUser === user?.userId && (
              <button onClick={() => setIsOpen(true)} className="mt-2 btn btn-neutral">Edit Profile</button>
            )}

            {
              isOpen && (
                <EditModal onClose={()=>setIsOpen(false)} />
              )
            }

            


          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <p className="font-semibold">{user?.username}</p>
          <p className="text-sm text-base-content/80">{user?.userBio}</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="w-12 h-0.5 bg-primary rounded-full"></div>

          <span className="text-primary font-bold tracking-widest text-sm">
            posts
          </span>

          <div className="w-12 h-0.5 bg-primary rounded-full"></div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {[...userPosts]?.reverse().map((post) => (
            <div
              key={post?._id}
              className="rounded-md aspect-square bg-base-300 overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-full">
                {post?.backgroundImage && (
                  <img
                    src={post.backgroundImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs sm:text-sm text-green-300 text-opacity-0 font-bold bg-black/40">
                  {post?.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavbar user={loggedInUser}/>
      

    </>
  );
}

export default ProfilePage;
