import React from "react";

function Login() {
  return (
    <div
      data-theme="forest"
      className="min-h-screen bg-base-200 text-base-content p-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-bold">Login</h1>

      <p className="text-base-content/70 text-sm mt-3">
        Create your account to start sharing quotes.
      </p>

      <div className="flex flex-col gap-5 p-5 w-80">
        <input type="email" placeholder="Email" className="input w-full" />

        <input
          type="password"
          placeholder="Password"
          className="input w-full"
        />
        <button className="btn btn-neutral mt-4">Login</button>
      </div>
    </div>
  );
}

export default Login;
