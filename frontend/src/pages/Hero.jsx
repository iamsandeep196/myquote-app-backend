import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Hero() {
  return (
    <>
      <div
        data-theme="forest"
        className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content px-4 sm:px-6"
      >
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-center">
          MyQuote
          <p className="mt-4 text-sm sm:text-base md:text-lg font-light tracking-normal text-base-content/80">
            Express what you think...
          </p>
        </h1>

        {/* Description */}
        <p className="text-base-content/70 mt-6 text-center text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
          Discover inspiring quotes and share your thoughts with the world.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 w-full sm:w-auto items-center">
          <button className="btn btn-neutral w-full sm:w-auto sm:btn-wide text-sm sm:text-base font-semibold tracking-wide rounded-xl shadow-lg">
            Explore Quotes
          </button>

          <button className="btn btn-outline w-full sm:w-auto sm:btn-wide text-sm sm:text-base font-semibold tracking-wide rounded-xl">
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
