import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Container, Grid } from "@mui/material";
import { AccountBalanceWallet, BarChart, CheckCircle, Lock, TrendingUp } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <Box 
    sx={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      backgroundColor: "#FFFFFF",
      padding: "20px 40px", 
      borderBottom: "1px solid #E2E8F0", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      zIndex: 1000 
    }}
  >
    <Button onClick={() => navigate("/")} sx={{ display: "flex", alignItems: "center", textTransform: "none", background: "none", border: "none", cursor: "pointer" }}>
      <Box display="flex" alignItems="flex-end" sx={{ height: 40, mr: 1 }}>
        <Box width={10} height={30} bgcolor="green" mr={0.5} sx={{ opacity: 0.9, boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", borderRadius: 1 }} />
        <Box width={10} height={40} bgcolor="blue" sx={{ opacity: 0.9, boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", borderRadius: 1 }} />
      </Box>
      <Typography variant="h5" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#2D3748" }}>
        Budget Buddy
      </Typography>
    </Button>

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
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8, paddingTop: "120px" }}>
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
              <img src= "src/assets/images/budgetIllustration.png" alt="Budget Buddy Illustration" style={{ maxWidth: "100%", height: "auto" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#F7FAFC", py: 8 }}>
      <Container maxWidth="lg">
        {/* Section Title */}
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
          Our Features
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={4}>
          {[
            {
              icon: <AccountBalanceWallet sx={{ fontSize: 40, color: "#3182CE" }} />,
              title: "Expense Tracking",
              desc: "Monitor all your daily transactions in one place and stay on top of your spending.",
            },
            {
              icon: <BarChart sx={{ fontSize: 40, color: "#3182CE" }} />,
              title: "Budget Planning",
              desc: "Set budgets for different categories and keep track of your expenses effortlessly.",
            },
            {
              icon: <TrendingUp sx={{ fontSize: 40, color: "#3182CE" }} />,
              title: "Financial Goals",
              desc: "Plan and achieve your financial goals by tracking progress in real-time.",
            },
            {
              icon: <Lock sx={{ fontSize: 40, color: "#3182CE" }} />,
              title: "Secure & Private",
              desc: "Your financial data is safe with our industry-standard security measures.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: "center", padding: 3, borderRadius: 2, backgroundColor: "#FFFFFF", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
                {feature.icon}
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4A5568", mt: 1 }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    <Box sx={{ backgroundColor: "#F7FAFC", py: 8 }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: "#2D3748",
            textAlign: "center",
            mb: 2,
          }}
        >
          What We Provide
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#4A5568",
            textAlign: "center",
            mb: 6,
          }}
        >
          Budget Buddy is your all-in-one finance manager to track expenses, plan budgets, and achieve financial goals.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            "Expense Tracking",
            "Budget Planning",
            "Financial Goals",
            "Spending Insights",
            "Secure Transactions",
            "Dark/Light Mode",
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#3182CE" }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    <Box sx={{ backgroundColor: "#FFFFFF", py: 8 }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: "#2D3748",
            textAlign: "center",
            mb: 2,
          }}
        >
          What Makes Budget Buddy Different?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#4A5568",
            textAlign: "center",
            mb: 6,
          }}
        >
          Take control of your finances like never before. Budget Buddy helps you track, plan, and achieve financial success effortlessly.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            "Smart Budgeting",
            "Expense Categorization",
            "Goal-Oriented Savings",
            "Personalized Reports",
            "Seamless Syncing",
            "User-Friendly Interface",
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#3182CE" }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

      {/* Footer */}
      <Box sx={{ padding: "20px 40px", borderTop: "1px solid #E2E8F0", textAlign: "center", backgroundColor: "#FFFFFF" }}>
        <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: "#4A5568" }}>
          © 2025 Budget Buddy. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;