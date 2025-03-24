import { Box, Container, Typography, Button, Stack } from "@mui/material";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center", alignItems: "center", bgcolor: "#00ADB5" }}>
      {/* Navbar Section */}
      {/* <Box sx={{display: "flex", color:"black"}}>
        <Typography variant="h6" sx={{fontWeight: "bold", color: "#f4f6f8", mb: 2}}> hello</Typography>
      </Box> */}
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#f4f6f8", mb: 2 }}>
          Welcome to Budget Buddy
        </Typography>
        <Typography variant="h6" sx={{ color: "#f4f6f8", mb: 3 }}>
          Take control of your finances with ease!
        </Typography>

        {/* Buttons: Get Started & Login */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold", "&:hover": { backgroundColor: "#178bab" } }}
          onClick={() => navigate("/signup")}>
            Get Started
          </Button>

          <Button
            variant="contained"
            sx={{ borderColor: "#d3ba2c", color: "#000", fontWeight: "bold", padding: "10px 20px", "&:hover": { backgroundColor: "#178bab" } }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingPage;
