import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        toast.error(data.message);
      }

      console.log(data);
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div
      data-theme="forest"
      className="min-h-screen bg-base-200 text-base-content p-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-bold">Signup</h1>

      <p className="text-base-content/70 text-sm mt-3">
        Create your account to start sharing quotes.
      </p>

      <div className="flex flex-col gap-5 p-5 w-80">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input w-full"
        />
        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
          Register
        </button>
        <p className="text-base-content/70 text-sm text-center">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="text-base-content/70 text-sm text-center"
          >
            Login
          </Link>
        </p>
       
      </div>
       <p className="text-base-content/40 text-sm flex items-center justify-center gap-1 mt-auto">
        Developed by<FaHeart />Sandeep Bharati
      </p>
    </div>
  );
}

export default Signup;
