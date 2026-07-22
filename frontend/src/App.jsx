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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FollowersModal from "./components/FollowersModal";
import { Toaster } from "react-hot-toast";

function App() {
  console.log(`


__        __   _                            _
\\ \\      / /__| | ___ ___  _ __ ___   ___  | |_ ___
 \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | __/ _ \\
  \\ V  V /  __/ | (_| (_) | | | | | |  __/ | || (_) |
 __\\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/
|  \\/  |_   _ / _ \\ _   _  ___ | |_ ___
| |\\/| | | | | | | | | | |/ _ \\| __/ _ \\
| |  | | |_| | |_| | |_| | (_) | ||  __/
|_|  |_|\\__, |\\__\\_\\\\__,_|\\___/ \\__\\___|
        |___/

- welcome to MyQuote

`)
  return (
    <>
      <BrowserRouter>
        <Toaster />
        
        <Routes>
           {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Hero />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/followers" element={<FollowersModal/>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
           <Route path="/quotes" element={<Quotes/>} />
           <Route path="/profile/:id" element={<ProfilePage/>} />
           <Route path="/create-post" element={<CreatePost/>} />
           <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
