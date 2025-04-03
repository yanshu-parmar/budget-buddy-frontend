import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, List, ListItem,
  ListItemText, Box, Button, Avatar,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/api/transactions/monthly")
      .then((res) => setMonthlyData(res.data))
      .catch((err) => console.error("Error fetching monthly data:", err));
  }, []);

  useEffect(() => {
    axios.get("/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Pie Chart Data
  const categories = transactions.reduce((acc, txn) => {
    if (!acc[txn.category]) acc[txn.category] = 0;
    acc[txn.category] += txn.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categories).map(([key, value]) => ({
    name: key,
    value: Math.abs(value),
  }));

  const COLORS = ["#4B8DDA", "#FF6384", "#36A2EB", "#FFCE56", "#2E7D32"];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{
        width: "250px", height: "100vh", color: "#000", padding: 2,
        position: "fixed", left: 0, top: 0, display: "flex", flexDirection: "column"
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>Y</Avatar>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>yanshuparmar17</Typography>
        </Box>

        <List>
          {[{ text: "Home", icon: <Home />, route: "/landingpage" },
            { text: "Dashboard",icon: <DashboardIcon />, route: "/dashboard"},
            { text: "Budgets", icon: <MonetizationOnIcon />, route: "/budgets" },
            { text: "Transactions", icon: <ReceiptLongIcon />, route: "/transactions" }]
            .map((item, index) => (
              <ListItem button key={index} onClick={() => navigate(item.route)}>
                {item.icon} <ListItemText primary={item.text} />
              </ListItem>
            ))}
        </List>

        <Button variant="contained" onClick={handleLogout} sx={{ mt: "auto", bgcolor: "#FF4D4D", color: "#FFFFFF" }}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ ml: "260px", p: 4, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#1E293B", mb: 4, textAlign: "center" }}>
           Overview
        </Typography>

        {/* Financial Overview */}
        <Grid container spacing={3}>
          {[{ title: "Total Income", value: monthlyData.reduce((sum, month) => sum + (month.totalIncome || 0), 0).toFixed(2), color: "#2E7D32" },
            { title: "Total Expenses", value: Math.abs(monthlyData.reduce((sum, month) => sum + (month.totalExpense || 0), 0)).toFixed(2), color: "#FF4D4D" },
            { title: "Net Balance", value: (monthlyData.reduce((sum, month) => sum + ((month.totalIncome || 0) - Math.abs(month.totalExpense || 0)), 0)).toFixed(2),
              color: monthlyData.reduce((sum, month) => sum + ((month.totalIncome || 0) - Math.abs(month.totalExpense || 0)), 0) >= 0 ? "#2E7D32" : "#FF4D4D" }]
            .map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ padding: 2, textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h5" sx={{ color: item.color }}>{item.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Spending Chart */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Spending Breakdown</Typography>
        <Card sx={{ padding: 4 }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;