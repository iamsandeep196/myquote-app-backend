import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Hero() {
  return (
    <>
    <Navbar/>
      
      <div
        data-theme="forest"
        className="min-h-screen bg-base-200 text-base-content p-10"
      >
        <h1 className="text-5xl font-bold">
          MyQuote
          <p className="mt-4 text-sm font-sans">Express what you think...</p>
        </h1>

        <p className="text-base-content/70 mt-4 text-sm">
          Discover inspiring quotes and share your thoughts.
        </p>

        <button className="btn btn-neutral mt-6">Explore</button>
      </div>
      <Footer />
    </>
  );
}

export default Hero;
