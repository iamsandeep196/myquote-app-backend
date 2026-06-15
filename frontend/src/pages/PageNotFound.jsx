import React from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PageNotFound() {
  return (
    <div>
      <Navbar />
      <main  data-theme="forest"
       className="min-h-screen flex items-center justify-center bg-base-100 px-6">
        <div className="max-w-2xl text-center">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 text-lg text-gray-300">
            The page you're looking for might have been removed, renamed, or is
            temporarily unavailable.
          </p>

          {/* Illustration */}
          <div className="mt-10 flex justify-center">
            <div className="relative">
              <Search className="w-28 h-28 text-indigo-400 animate-pulse" />
              <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/quotes"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-indigo-500 transition-all duration-300 hover:scale-105"
            >
              <Home size={18} />
              Back to Home
            </a>

            
          </div>

          {/* Footer Text */}
          <p className="mt-8 text-sm text-gray-500">
            Need help? Contact our support team.
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default PageNotFound;
