import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Button,
  Avatar,
  Tooltip,
  CssBaseline,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Home } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartTooltip } from "recharts";

const MonthlyTransactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    const now = new Date();
    const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    setSelectedMonth(defaultMonth);
    fetchMonthlyTransactions(defaultMonth);
  }, []);

  const fetchMonthlyTransactions = async (month) => {
    try {
      const res = await axios.get(`/transactions/month/${month}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch monthly transactions", err);
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    fetchMonthlyTransactions(month);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pieData = useMemo(() => {
    const categories = {};
    transactions.forEach((txn) => {
      if (!categories[txn.category]) categories[txn.category] = 0;
      categories[txn.category] += Math.abs(txn.amount);
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const COLORS = ["#4B8DDA", "#FF6384", "#36A2EB", "#FFCE56", "#2E7D32"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
            sx={{
            width: "250px",
            height: "100vh",
            padding: 2,
            backgroundColor: darkMode ? "#121212" : "#F7FAFC",
            color: darkMode ? "#FFFFFF" : "#000000",
            position: "fixed",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: `1px solid ${darkMode ? "#333" : "#E0E0E0"}`
            }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>Y</Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              yanshuparmar17
            </Typography>
          </Box>

          <List>
            {[
              { text: "Home", icon: <Home />, route: "/landingpage" },
              { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
              { text: "Budgets", icon: <MonetizationOnIcon />, route: "/budgets" },
              { text: "Transactions", icon: <ReceiptLongIcon />, route: "/transactions" },
            ].map((item, index) => (
              <ListItem button key={index} onClick={() => navigate(item.route)}>
                {item.icon} <ListItemText primary={item.text} sx={{ ml: 1 }} />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ mt: "auto", bgcolor: "#FF4D4D", color: "#FFFFFF" }}
          >
            Logout
          </Button>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ marginLeft: "250px", padding: 4 }}>
          {/* Dark Mode Toggle */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
            Monthly Transactions
          </Typography>

          {/* Month Picker */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
            <TextField
              type="month"
              label="Select Month"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
            <Button variant="contained" onClick={() => fetchMonthlyTransactions(selectedMonth)}>
              Load Monthly Transactions
            </Button>
          </Box>

          {/* Transaction Cards */}
          <Grid container spacing={2}>
            {transactions.map((txn) => (
              <Grid item xs={12} md={4} key={txn._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{txn.category}</Typography>
                    <Typography variant="body2">
                      {txn.type} - ${txn.amount}
                    </Typography>
                    <Typography variant="caption">{txn.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pie Chart */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Monthly Spending Breakdown
          </Typography>
          <Card sx={{ p: 3 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name }) => name}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartTooltip formatter={(value, name) => [`$${value}`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MonthlyTransactions;

//http://localhost:4000/gettransactions/