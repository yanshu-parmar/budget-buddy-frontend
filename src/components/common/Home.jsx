import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        textAlign: "center",
        padding: 0,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          padding: 5,
          borderRadius: 0,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Budget Buddy
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Track expenses, manage budgets, and achieve financial goals effortlessly.
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#10B981",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#0a8e6a" },
            }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d3ba2c",
              color: "#000",
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#b89c21" },
            }}
            onClick={() => navigate("/budgets")}
          >
            View Budgets
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#178bab",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#126d8a" },
            }}
            onClick={() => navigate("/transactions")}
          >
            Transactions
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;