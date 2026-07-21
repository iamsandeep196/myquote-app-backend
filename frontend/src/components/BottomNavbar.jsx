import React, { useEffect, useState } from 'react'
import { House, Search, PlusSquare, Heart, User } from "lucide-react";
import { Link } from 'react-router-dom';
import API_URL from '../api/api';

function BottomNavbar() {

  // console.log(profile)

  const [myProfile,setMyProfile] = useState("");

  const fetchProfile = async () => {
    try {

      const response = await fetch(`${API_URL}/api/auth/myprofile`,
        {
          method:"GET",
          headers : {
            "Content-Type" : "application/json"
          },
          credentials:"include"
        }
      )

      const data = await response.json();
      // console.log(data);
      setMyProfile(data.profile.user_id)

    }
    catch (error){
      console.error(error);

    }
  }

  useEffect(() => {
    fetchProfile();
  },[myProfile]);
  

    
  return (
    <div data-theme="forest" className='fixed bottom-0 left-0 w-full'>
        <div className='flex justify-around items-center h-16
        '>
            <Link to="/quotes">
            <House/>
            </Link>

            <Search/>
            <Link to="/create-post">
             <PlusSquare/>
            </Link>
           
            <Heart/>
            <Link to={`/profile/${myProfile}`}>
            <User/>
            </Link>
        </div>
    </div>
  )
}

export default BottomNavbar