import React, { useState } from "react";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import toast from "react-hot-toast";

function QuoteCard({ quote }) {

  


   const [isFollowing, setIsFollowing] = useState(false);

useEffect(() => {
   setIsFollowing(quote.userId.isFollowing);
}, [quote.userId.isFollowing]);

    function timeAgo(createdAt){

        const currentTime = new Date();
        const postTime = new Date(createdAt);
        const diff = currentTime - postTime;
        const seconds = Math.floor(diff/1000);
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24);

        if(days > 0){
            return `${days}d ago`;
        }
        if(hours > 0){
            return `${hours}h ago`;
        }
        if(minutes > 0){
            return  `${minutes}m ago`;
        }
        return `${seconds}s ago`;



    }

    const handleFollow = async (userId) => {

        try {

            const response = await fetch("http://localhost:3000/api/auth/follow/user/${userId}",

                {
                    method:"POST",
                    credentials : "include",
                    
                }
            );

            const data = await response.json();
            
           

            if(data.success){
                toast.success(data.message)
                setIsFollowing(data.isFollowing);
                console.log(quote.userId.isFollowing)
      
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
            console.log(error.message)

        }

    }


  return (
    
      <div data-theme="synthwave" className="card bg-base-100 w-96 shadow-2xl border border-base-300">
        {/* Top User Info */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://i.pravatar.cc/150?img=12" alt="user" />
              </div>
            </div>

            {/* User Name */}
            <div>
              <h2 className="font-bold text-base">{quote.userId.name}</h2>

              <p className="text-xs opacity-70">{timeAgo(quote.createdAt)}</p>
            </div>
          </div>

          {/* Follow Button */}
          <button className="btn btn-neutral btn-sm" onClick={() => handleFollow(quote.userId._id)}>
            {
                isFollowing ? "Following" : "Follow"
            }
          </button>
        </div>

        {/* Background Image */}
        <figure className="relative">
          <img
            src={quote.backgroundImage}
            alt="quote"
            className="h-96 w-full object-cover"
          />

          {/* Quote Text On Image */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="text-black text-sm font-bold text-center">
              {quote.text}
            </p>
          </div>
        </figure>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-5">
            {/* Like */}
            <button className="flex items-center gap-2">
              ❤️ 
              <span>{quote.likes.length}</span>
            </button>

            {/* Comment */}
            <button className="flex items-center gap-2">
              💬
              <span>45</span>
            </button>
          </div>

          {/* Share */}
          <button>📤</button>
        </div>
      </div>

  );
}

export default QuoteCard;
