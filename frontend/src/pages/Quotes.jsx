import React, { useEffect, useState } from "react";
import QuoteCard from "../components/QuoteCard";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

function Quotes() {
  const [quotes, setQuotes] = useState([]);


  const fetchQuotes = async () => {
    const response = await fetch(
      "http://localhost:3000/api/quotes/getAllQuotes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();
    // console.log(data.data);

    setQuotes(data.data);
  };

  useEffect(() => {
    fetchQuotes();
    document.title = "Home | MyQuote";
    
  }, []);

  return (
    
    <>
  <div
    data-theme="forest"
    className="min-h-screen w-full bg-base-200 text-base-content"
  >
    <Navbar />

    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

        {/* Sidebar */}
        {/* <aside className="w-full lg:w-[30%]">
          <div className="lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </aside> */}

        {/* Quotes Section */}
        <main className="w-full lg:w-[70%]">
          <div className="flex flex-col gap-4 sm:gap-6">
            {quotes?.map((quote) => (
              <QuoteCard
                key={quote._id}
                quote={quote}
              />
            ))}
          </div>
        </main>

      </div>
    </div>
  </div>
  <BottomNavbar/>
</>
  );
}

export default Quotes;
