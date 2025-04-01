import { useState } from "react";
import { Container, Typography, Button, Box, AppBar } from "@mui/material";
import Navbar from "../common/Navbar"; // Import Navbar
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  
  const [themeMode, setThemeMode] = useState("light");
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? "#0B0F19" : "#fff", color: themeMode === "dark" ? "#fff" : "#000" }}>
    <Box sx={{ backgroundColor: themeMode === "dark" ? "#0B0F19" : "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />

      {/* Main Landing Page Content */}
      <Container sx={{ textAlign: "center", paddingTop: "100px" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", color: themeMode === "dark" ? "#fff" : "#000" }}>
          Welcome to Budget Buddy
        </Typography>
        <Typography variant="h5" sx={{ color: themeMode === "dark" ? "#b0b0b0" : "#333", marginTop: 2 }}>
          Your personal finance tracker made easy!
        </Typography>

        <Button 
          variant="contained" 
          sx={{ marginTop: 4, backgroundColor: "#00ADB5", fontWeight: "bold", "&:hover": { backgroundColor: "#008C9E" } }} 
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </Container>
    </Box>
    </AppBar>
    
  );
};

export default LandingPage;