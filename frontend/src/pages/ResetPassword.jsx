import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
function ResetPassword() {

    document.title = "Reset Password | MyQuote"

    const { token } = useParams();
    const [newPassword,setNewPassword] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {

            const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({
                        password:newPassword
                    })
                }
            )
            const data = await response.json();
            // console.log(data);
            if(data.success){
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
            

        }
        catch(error){
            console.error(error);
        }

    }
  return (
     <div data-theme="forest" className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
            <Lock className="h-8 w-8 text-white" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            New Password
          </label>

          <div className="relative">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white placeholder-slate-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
              required
            />

          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Reset Password
          </button>
          
        </form>
         <p className="text-base-content/40 text-sm flex items-center justify-center gap-1 mt-5">
                      Developed by<FaHeart />Sandeep Bharati
                    </p>
      </div>
      
    </div>
  )
}

export default ResetPassword