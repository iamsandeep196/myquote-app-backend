import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  // console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const response = await fetch("http://localhost:3000/api/auth/forgot-password",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({email})
        }
      );

      const data = await response.json();
      console.log(data)

      if(data.success){
        toast.success(data.message);
        
      }
      else{
        toast.error(data.message)
      }


    }
    catch (error){
      console.error("Error message : ",error.message);
    }


  }

 






  return (
     <div data-theme="forest" className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        

        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-5">
            <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

            <p className="text-center text-base-content/60 mt-2">
              Enter your registered email address to receive a password reset
              link.
            </p>

            {/* Email */}
            <div className="mt-6">
              <label className="label">
                <span className="m-3 label-text font-medium">Email address</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered input-success w-full"
              />
            </div>

            {/* Button */}
            <button onClick={handleSubmit} className="btn btn-success w-full mt-6 text-white">
              Send Reset Link
            </button>

            {/* Divider */}
            <div className="divider text-base-content/40">OR</div>

            {/* Back */}
            <Link to="/login" className="btn btn-outline btn-success w-full">
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
