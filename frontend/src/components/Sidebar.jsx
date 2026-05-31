import React from 'react'

function Sidebar() {
  return (
    <div className="w-80 h-fit sticky top-20">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">

          <img
            src={user?.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <h2 className="text-xl font-bold mt-2">
            {user?.name}
          </h2>

          <p className="text-sm opacity-70">
            {user?.email}
          </p>

          <div className="divider"></div>

          <div className="flex justify-around w-full">
            <div>
              <p className="font-bold text-lg">
                {postCount}
              </p>
              <p className="text-sm">Posts</p>
            </div>

            <div>
              <p className="font-bold text-lg">
                {user?.followers?.length || 0}
              </p>
              <p className="text-sm">Followers</p>
            </div>

            <div>
              <p className="font-bold text-lg">
                {user?.following?.length || 0}
              </p>
              <p className="text-sm">Following</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Sidebar