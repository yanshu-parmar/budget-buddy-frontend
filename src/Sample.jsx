import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, List, ListItem,
  ListItemText, Box, Button, Avatar, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { Home, Folder, Insights, ExpandMore } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions/monthly")
      .then((res) => res.json())
      .then((data) => setMonthlyData(data));
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
        width: "250px",
        height: "100vh",
        backgroundColor: "#1F2937",
        color: "#FFFFFF",
        padding: 2,
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>Y</Avatar>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>yanshuparmar17</Typography>
        </Box>

        <List>
          {[{ text: "Home", icon: <Home />, route: "/" },
            { text: "My Files", icon: <Folder />, route: "/files" },
            { text: "Generate", icon: <Insights />, route: "/generate" }]
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
      <Container maxWidth="xl" sx={{ ml: "260px", p: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#1E293B", textAlign: "center", mb: 4 }}>
          Budget Buddy - Monthly Overview
        </Typography>

        {/* Financial Overview */}
        <Grid container spacing={3}>
          {[{ title: "Total Income", value: monthlyData.reduce((sum, month) => sum + month.totalIncome, 0).toFixed(2), color: "#2E7D32" },
            { title: "Total Expenses", value: Math.abs(monthlyData.reduce((sum, month) => sum + month.totalExpense, 0)).toFixed(2), color: "#FF4D4D" },
            { title: "Net Balance", value: (monthlyData.reduce((sum, month) => sum + (month.totalIncome - Math.abs(month.totalExpense)), 0)).toFixed(2),
              color: monthlyData.reduce((sum, month) => sum + (month.totalIncome - Math.abs(month.totalExpense)), 0) >= 0 ? "#2E7D32" : "#FF4D4D" }]
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

        {/* Monthly Transactions & Budget Showcase */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Monthly Transactions</Typography>
        {monthlyData.map((month) => (
          <Accordion key={month._id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{month._id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">Income: <span style={{ color: "#2E7D32" }}>${month.totalIncome}</span></Typography>
              <Typography variant="body1">Expenses: <span style={{ color: "#FF4D4D" }}>${Math.abs(month.totalExpense)}</span></Typography>
              <List>
                {month.transactions.map((txn, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={txn.name} secondary={`$${txn.amount} (${txn.category})`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}

      </Container>
    </Box>
  );
};

export default Dashboard;