import React from 'react'
import Hero from './pages/Hero'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import Login from './pages/Login'
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <>
  
    {/* // <Hero /> */}
    <Toaster />
    <Signup />
    {/* <Login /> */}
    <Footer />
    </>
    
  

  
  )
}

export default App