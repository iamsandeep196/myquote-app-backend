import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import BASE_URL from "../utils/baseUrl";

function Login() {

  const navigate = useNavigate()


  const [formData, setFormData] = useState({
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
      const response = await fetch(`https://myquote-app-backend.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data.message);
      if (data.success) {
        toast.success(data.message);

        setFormData({
          email: "",
          password: "",

        });

        navigate("/quotes");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <>
    <div
      data-theme="forest"
      className="min-h-screen bg-base-200 text-base-content p-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-bold">Login</h1>

      <p className="text-base-content/70 text-sm mt-3">
        A place where words feel alive
      </p>

      <div className="flex flex-col gap-5 p-5 w-80 mt-5">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className="input w-full"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input w-full"
        />
        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
          Login
        </button>
        <p className="text-base-content/70 text-sm text-center">
          Don't have an account ?{" "}<Link to="/signup" className="text-base-content/70 text-sm text-center">Signup</Link>
        </p>
      </div>
      <p className="text-base-content/40 text-sm flex items-center justify-center gap-1 mt-auto">
              Developed by<FaHeart />Sandeep Bharati
            </p>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
