// import React from "react"
import LandingPage from "./components/common/LandingPage";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Signup from "./components/common/Signup";
import AdminLayout from "./components/layouts/AminLayout";
import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions";
import Budgets from "./components/pages/Budgets";
import axios from "axios";
// import UserProfile from "./components/user/UserProfile"
import { useEffect } from "react";
import PrivateRoutes from "./components/hooks/PrivateRoutes";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import { AddBudget } from "./components/pages/AddBudget";
import { ThemeProviderWrapper } from "./components/layouts/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MonthlyTransaction from "./components/pages/MonthlyTransaction";
import Goals from "./components/pages/Goals";
import { isLoggedIn } from "./components/utils/auth";

const App = () => {
  axios.defaults.baseURL = "http://localhost:4000";
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/landingpage";

  useEffect(() => {
    if (isAuthPage || isPublicPage) {
      document.body.className = "";
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname, isAuthPage, isPublicPage]);

  return (
    <div className={isAuthPage || isPublicPage ? "" : "app-wrapper"}>
      <ThemeProviderWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Signup />
            }
          />

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/addbudgets" element={<AddBudget />} />
            <Route
              path="/monthlytransaction"
              element={<MonthlyTransaction />}
            />
            
          </Route>

          {/* Admin Routes */}
          <Route path="/adminlayout" element={<AdminLayout />} />
          <Route path="/sidebar" element={<Sidebar />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProviderWrapper>
      <ToastContainer />
    </div>
  );
};

export default App;

//#f04c5f
