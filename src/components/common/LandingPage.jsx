import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  //   Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      sx={{ backgroundColor: "#000201", color: "#a2b2a7", minHeight: "100vh" }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1c8c3d" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#d3ba2c" }}
          >
            Budget Buddy
          </Typography>
          <Button component={Link} to="/login" sx={{ color: "white" }}>
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: "#d3ba2c",
              color: "black",
              "&:hover": { backgroundColor: "#178bab" },
            }}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h2" fontWeight="bold" color="#d3ba2c">
          Welcome to Budget Buddy
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
          Manage your finances effectively with Budget Buddy. Track spending,
          set budgets, and achieve your financial goals.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{ backgroundColor: "#1c8c3d", color: "white", mx: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#d3ba2c", color: "#d3ba2c" }}
          >
            Learn More
          </Button>
        </Box>
      </Container>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={6}
          sx={{ p: 4, backgroundColor: "#1c8c3d", color: "white" }}
        >
          <Typography variant="h4" fontWeight="bold" color="#d3ba2c">
            About Us
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Budget Buddy is your ultimate finance management tool, designed to
            help you keep track of your expenses and reach your financial goals
            effortlessly.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
