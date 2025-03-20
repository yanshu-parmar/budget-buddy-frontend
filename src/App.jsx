// import React from "react"

// import ExpenceList from "./components/admin/ExpenceList"
import LandingPage from "./components/common/LandingPage"
import { Login } from "./components/common/Login"
import { Route, Routes } from "react-router-dom"
// import Navbar from "./components/common/Navbar"
import Signup from "./components/common/Signup"

const App = () => {
  return (
    <>
      {/* <ExpenceList /> */}
      {/* <Navbar /> */}
      
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  )
}

export default App