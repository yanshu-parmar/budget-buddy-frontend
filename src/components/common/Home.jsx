import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Container, Grid } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column" }}>

      {/* Header */}

      <Box sx={{ padding: "20px 40px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#2D3748" }}>
          Budget Buddy
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" sx={{ borderColor: "#3182CE", color: "#3182CE", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "none", "&:hover": { borderColor: "#2B6CB0", color: "#2B6CB0" } }} onClick={() => navigate("/login")}>
            Log In
          </Button>

          <Button variant="contained" sx={{ backgroundColor: "#3182CE", color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "none", "&:hover": { backgroundColor: "#2B6CB0" } }} onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                color: "#2D3748",
                mb: 2,
              }}
            >
              Take Control of Your Finances
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#4A5568",
                mb: 4,
                fontSize: "1.1rem",
              }}
            >
              Budget Buddy helps you track spending, manage budgets, and plan for a secure financial future—all in one simple, powerful app.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3182CE",
                color: "#FFFFFF",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                textTransform: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                "&:hover": { backgroundColor: "#2B6CB0" },
              }}
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Placeholder for an image or illustration */}
            <Box
              sx={{
                height: 300,
                backgroundColor: "#EDF2F7",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#4A5568",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <img src="/path/to/dashboard-illustration.svg" alt="Budget Buddy Dashboard" style={{ maxWidth: "100%", height: "auto" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "#F7FAFC", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              color: "#2D3748",
              textAlign: "center",
              mb: 6,
            }}
          >
            Why Choose Budget Buddy?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Track Spending",
                desc: "Monitor every transaction with ease and clarity.",
              },
              {
                title: "Set Budgets",
                desc: "Create custom budgets to stay on top of your goals.",
              },
              {
                title: "Visual Insights",
                desc: "Understand your finances with intuitive charts.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      color: "#2D3748",
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#4A5568",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: "20px 40px",
          borderTop: "1px solid #E2E8F0",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#4A5568",
          }}
        >
          © 2025 Budget Buddy. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;