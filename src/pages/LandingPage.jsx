import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#FFFFFF", // White background
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: "20px 40px",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: "#2D3748", // Dark slate
          }}
        >
          Budget Buddy
        </Typography>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={{
            borderColor: "#f04c5f",
            color: "#f04c5f",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { borderColor: "#2B6CB0", color: "#2B6CB0" },
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            color: "#2D3748",
            textAlign: "center",
            mb: 2,
          }}
        >
          Welcome to Budget Buddy
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#4A5568", // Gray
            textAlign: "center",
            mb: 6,
            fontSize: "1.1rem",
          }}
        >
          Your personal finance companion is ready to help you manage your money effectively.
        </Typography>

        {/* Action Cards */}
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Dashboard",
              desc: "Get a quick overview of your finances.",
              path: "/dashboard",
            },
            {
              title: "Budgets",
              desc: "Set and track your spending limits.",
              path: "/budgets",
            },
            {
              title: "Transactions",
              desc: "Review and manage your transactions.",
              path: "/transactions",
            },
          ].map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  padding: 3,
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #E2E8F0",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    color: "#2D3748",
                    mb: 1,
                  }}
                >
                  {action.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#4A5568",
                    mb: 2,
                  }}
                >
                  {action.desc}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3182CE", // Blue
                    color: "#FFFFFF",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "6px",
                    "&:hover": { backgroundColor: "#2B6CB0" },
                  }}
                  onClick={() => navigate(action.path)}
                >
                  Go to {action.title}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

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

export default Landing;