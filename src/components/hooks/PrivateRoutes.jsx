import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn, getToken, isTokenExpired } from "../utils/auth";
import { CircularProgress, Box } from "@mui/material";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isLoggedin: false,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      const token = getToken();
      const expired = isTokenExpired();

      setAuthState({
        isLoggedin: loggedIn && token && !expired,
        loading: false,
      });
    };

    checkAuth();
  }, []);

  return authState;
};

const PrivateRoutes = () => {
  const { isLoggedin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
