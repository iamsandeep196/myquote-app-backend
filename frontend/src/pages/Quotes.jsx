import React, { useEffect, useState } from "react";
import QuoteCard from "../components/QuoteCard";
import Navbar from "../components/Navbar";
import BASE_URL from "../utils/baseUrl";

function Quotes() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const response = await fetch(
      `${BASE_URL}/api/quotes/getAllQuotes`,
      {
        credentials : "include"
      }
    );

    const data = await response.json();
    console.log(data.data);

    setQuotes(data.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (

    <>

    
  
    <div data-theme="forest" className="min-h-screen 
    flex flex-col gap-2 items-center
    bg-base-200 text-base-content">
       <Navbar/>

        {
            quotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} />
            ))

        }
       
      


    </div>
    </>
  );
}

export default Quotes;
