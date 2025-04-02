import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent,
  List, ListItem, ListItemText, Box, Button, Avatar
} from "@mui/material";
import { Home, Folder, Insights } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { name: "McDonald's", amount: -24.99, category: "Food" },
    { name: "Car Loan", amount: -400, category: "Loan" },
    { name: "Salary", amount: +2500, category: "Income" },
  ]);

  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

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

  const COLORS = ["#1E2A44", "#D32F2F", "#2E7D32", "#4A5568", "#A0AEC0"];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box sx={{
        width: "225px",
        height: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#FFFFFF",
        padding: 2,
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ bgcolor: "#D32F2F", mr: 2 }}></Avatar>
        </Box>

        <List>
          {[
            { text: "Home", icon: <Home />, route: "/" },
            { text: "My Files", icon: <Folder />, route: "/files" },
            { text: "Generate", icon: <Insights />, route: "/generate" },
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.route)}>
              {item.icon} <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Button variant="contained" onClick={handleLogout} sx={{ mt: "auto", bgcolor: "#D32F2F", color: "#FFFFFF" }}>Logout</Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ ml: "250px", p: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Montserrat', 'sans-serif'", fontWeight: 600, color: "#1E2A44", textAlign: "center", mb: 6 }}>Budget Buddy</Typography>
        
        {/* Financial Overview */}
        <Grid container spacing={3}>
          {[
            { title: "Income", value: transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: "#2E7D32" },
            { title: "Expenses", value: Math.abs(transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0)).toFixed(2), color: "#D32F2F" },
            { title: "Balance", value: transactions.reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: transactions.reduce((sum, txn) => sum + txn.amount, 0) >= 0 ? "#2E7D32" : "#D32F2F" },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ padding: 2, textAlign: "center", backgroundColor: "#F5F5F5" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#1E2A44" }}>{item.title}</Typography>
                  <Typography variant="h5" sx={{ color: item.color }}>{item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Spending Chart */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: "#1E2A44" }}>Spending Breakdown</Typography>
        <Card sx={{ padding: 4, backgroundColor: "#F5F5F5" }}>
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