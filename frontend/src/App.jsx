import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Quotes from "./pages/Quotes";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quotes" element={
            <ProtectedRoute>
           <Quotes />
           </ProtectedRoute>
          } />
          <Route path="/" element={<Hero />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
