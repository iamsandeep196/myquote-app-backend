import React from "react";

function ProfilePage() {


  const posts = [
  { _id: 1, text: "First Post" },
  { _id: 2, text: "Second Post" },
  { _id: 3, text: "Third Post" },
];
  return (
  <div
  data-theme="forest"
  className="min-h-screen w-full px-4 py-6"
>
  {/* Top Section */}
  <div className="flex items-center gap-6">
    {/* Profile Pic */}
    <div className="avatar">
      <div className="w-24 sm:w-32 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
      </div>
    </div>

    {/* Stats */}
    <div className="flex-1">
      <h2 className="text-xl sm:text-2xl font-bold">
        Sandeep Bharati
      </h2>

      <div className="flex gap-6 mt-3">
        <div>
          <span className="font-bold">{posts.length}</span>
          <p className="text-sm">Posts</p>
        </div>

        <div>
          <span className="font-bold">245</span>
          <p className="text-sm">Followers</p>
        </div>

        <div>
          <span className="font-bold">180</span>
          <p className="text-sm">Following</p>
        </div>
      </div>
    </div>
  </div>

  {/* Bio */}
  <div className="mt-4">
    <p className="font-semibold">Sandeep Bharati</p>
    <p className="text-sm text-base-content/80">
      Software Developer | MERN Stack Developer
    </p>
  </div>

  {/* Divider */}
  <div className="divider my-6">POSTS</div>

  {/* Instagram Grid */}
  <div className="grid grid-cols-3 gap-1 sm:gap-2">
    {posts.map((post) => (
      <div
        key={post._id}
        className="aspect-square bg-base-300 overflow-hidden cursor-pointer"
      >
        {post.image ? (
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs sm:text-sm">
            {post.text}
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  );
}

export default ProfilePage;
