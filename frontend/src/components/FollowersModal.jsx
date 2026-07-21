import React from "react";

function FollowersModal() {
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-base-100 shadow-2xl border border-base-300 overflow-hidden">

  {/* Header */}
  <div className="sticky top-0 z-10 bg-base-100/90 backdrop-blur-md border-b border-base-300 px-6 py-5">
    <h2 className="text-2xl font-bold">Followers</h2>
    <p className="text-sm text-base-content/60">
      248 people follow you
    </p>
  </div>

  {/* List */}
  <div className="max-h-137.5 overflow-y-auto">

    {/* User */}
    <div className="flex items-center justify-between px-6 py-4 hover:bg-base-200 transition-all duration-300">
      <div className="flex items-center gap-4">

        <div className="avatar online">
          <div className="w-14 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
          </div>
        </div>
        
         <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Sandeep Bharati</h3>

            <div className="badge badge-primary badge-xs">
              PRO
            </div>
          </div>

          <p className="text-sm text-base-content/60">
            @iamsandeep196
          </p>
        </div>

      </div>

      <button className="btn btn-primary btn-sm rounded-full px-5">
        View
      </button>
    </div>

    <div className="divider my-0"></div>

    {/* User */}
    <div className="flex items-center justify-between px-6 py-4 hover:bg-base-200 transition-all duration-300">
      <div className="flex items-center gap-4">

        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Rahul Kumar</h3>
          <p className="text-sm text-base-content/60">
            @rahuldev
          </p>
        </div>

      </div>

      <button className="btn btn-outline btn-sm rounded-full">
        Following
      </button>
    </div>

    <div className="divider my-0"></div>

    {/* User */}
    <div className="flex items-center justify-between px-6 py-4 hover:bg-base-200 transition-all duration-300">
      <div className="flex items-center gap-4">

        <div className="avatar offline">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/3@94.webp" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Priya Sharma</h3>
          <p className="text-sm text-base-content/60">
            @priya.codes
          </p>
        </div>

      </div>

      <button className="btn btn-primary btn-sm rounded-full">
        Follow Back
      </button>
    </div>

    <div className="divider my-0"></div>

    {/* User */}
    <div className="flex items-center justify-between px-6 py-4 hover:bg-base-200 transition-all duration-300">
      <div className="flex items-center gap-4">

        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/4@94.webp" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Aman Singh</h3>
          <p className="text-sm text-base-content/60">
            @amansingh
          </p>
        </div>

      </div>

      <button className="btn btn-ghost btn-circle">
        ⋮
      </button>
    </div>

  </div>

</div>
  );
}

export default FollowersModal;
