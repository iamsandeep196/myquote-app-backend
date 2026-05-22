import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
