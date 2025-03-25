// import React from "react"
import LandingPage from "./components/common/LandingPage"
import { Route, Routes, useLocation } from "react-router-dom"
import Signup from "./components/common/Signup"
import AdminLayout from "./components/layouts/AminLayout"
import Sidebar from "./components/layouts/Sidebar"
import Dashboard from "./components/pages/Dashboard"
import Transactions from "./components/pages/Transactions"
import Budgets from "./components/pages/Budgets"
import axios from "axios"
import UserProfile from "./components/user/UserProfile" 
import { useEffect } from "react"
import PrivateRoutes from "./components/hooks/PrivateRoutes"
import Home from "./components/common/Home"
import Login from "./components/common/Login"
import { AddBudget } from "./components/pages/AddBudget"


const App = () => {

  axios.defaults.baseURL = "http://localhost:4000";
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""
    } else {
      document.body.className = "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded"
    }
  }, [location.pathname])

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/privateroutes" element={<PrivateRoutes />}></Route>
        <Route path="/userprofile" element={<UserProfile />}></Route>
        <Route path="/budgets" element={<Budgets />}></Route>
        <Route path="/adminlayout" element={<AdminLayout />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/addbudgets" element={<AddBudget />}></Route>
      </Routes>
    </div>
  )
}

export default App