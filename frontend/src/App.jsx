import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Hero from "./pages/Hero";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Quotes from "./pages/Quotes";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./components/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        
        <Routes>
           {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Hero />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
           <Route path="/quotes" element={<Quotes/>} />
           <Route path="/profile" element={<ProfilePage/>} />
           <Route path="/create-post" element={<CreatePost/>} />
           <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
