import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton, Drawer, 
  List, ListItem, ListItemText, Box
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { name: "McDonald's", amount: -24.99, category: "Food" },
    { name: "Car Loan", amount: -400, category: "Transport" },
    { name: "Salary", amount: 2500, category: "Income" },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
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

  const COLORS = ["#ff7300", "#00C49F", "#FFBB28", "#0088FE", "#E91E63"];

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff", padding: 4 }}>

      {/* Sidebar Toggle */}
      <IconButton onClick={toggleSidebar} sx={{ position: "fixed", top: 20, left: 20, color: "#d3ba2c", zIndex: 1000 }}>
        <ReorderIcon fontSize="large" />
      </IconButton>

      {/* Sidebar Navigation */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, backgroundColor: "#1e293b", height: "100vh", color: "#fff", padding: 2 }}>
          <Typography variant="h6" sx={{ paddingBottom: 2, colo: "red" }}>Budget Buddy</Typography>
          <List>
            <ListItem button onClick={() => navigate("/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate("/budgets")}>
              <ListItemText primary="Budgets" />
            </ListItem>
            <ListItem button onClick={() => navigate("/transactions")}>
              <ListItemText primary="Transactions" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 4, color: "#d3ba2c", textAlign: "center" }}>
        Dashboard
      </Typography>

      {/* Financial Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#1e293b", color: "#fff", textAlign: "center", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Income</Typography>
              <Typography variant="h5" sx={{ color: "#00C49F" }}>
                ${transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#1e293b", color: "#fff", textAlign: "center", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Expenses</Typography>
              <Typography variant="h5" sx={{ color: "#e53935" }}>
                ${Math.abs(transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0)).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#1e293b", color: "#fff", textAlign: "center", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h5" sx={{ color: transactions.reduce((sum, txn) => sum + txn.amount, 0) >= 0 ? "#00C49F" : "#e53935" }}>
                ${transactions.reduce((sum, txn) => sum + txn.amount, 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions List */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2, color: "#d3ba2c" }}>
        Recent Transactions
      </Typography>
      <Grid container spacing={3}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#1e293b", color: "#fff", textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
              <CardContent>
                <Typography variant="h6">{transaction.name}</Typography>
                <Typography variant="body1" sx={{ color: transaction.amount < 0 ? "#e53935" : "#43a047" }}>
                  {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `$${transaction.amount.toFixed(2)}`}
                </Typography>
                <Typography variant="caption" sx={{ color: "#d3ba2c" }}>{transaction.category}</Typography>
              </CardContent>
              <IconButton onClick={() => handleDeleteTransaction(index)} sx={{ color: "#e53935" }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Spending Chart */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2, color: "#d3ba2c" }}>
        Spending Breakdown
      </Typography>
      <Card sx={{ backgroundColor: "#1e293b", padding: 4 }}>
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
  );
};

export default Dashboard;
