import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton, Drawer, 
  List, ListItem, ListItemText, Box, Button
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { name: "McDonald's", amount: -24.99, category: "Food" },
    { name: "Car Loan", amount: -400, category: "Loan" },
    { name: "Salary", amount: +2500, category: "Income" },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
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

  const COLORS = ["#1E2A44", "#D4A017", "#2E7D32", "#4A5568", "#A0AEC0"]; 

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", backgroundColor: "#F8F1E9", color: "#1E2A44", padding: 4}}>

      {/* Header */}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, padding: "10px 20px" }}>
        <IconButton onClick={toggleSidebar} sx={{ color: "#D4A017" }}>
          <ReorderIcon fontSize="large" />
        </IconButton>

        <Typography variant="h4" sx={{ fontFamily: "'Lora', serif", flexGrow: 1, textAlign: "center", color: "#1E2A44" }}>
          Budget Buddy
        </Typography>

        <Button variant="outlined" sx={{ borderColor: "#D4A017", color: "#D4A017", "&:hover": { backgroundColor: "#D4A017", color: "#F8F1E9" } }} startIcon={<LogoutIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Sidebar */}

      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 220, backgroundColor: "#1E2A44", height: "100vh", color: "#F8F1E9", padding: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "'Lora', serif', paddingBottom: 2, color: '#D4A017'" }}>
            Budget Buddy
          </Typography>

          <List>
            {["Dashboard", "Budgets", "Transactions"].map((text) => (
              <ListItem button key={text} onClick={() => navigate(`/${text.toLowerCase()}`)} sx={{ "&:hover": { backgroundColor: "#2E3B55" }, borderRadius: "8px" }}>
                <ListItemText primary={text} primaryTypographyProps={{ fontFamily: "'Montserrat', sans-serif" }} />
              </ListItem>))}
          </List>
        </Box>
      </Drawer>

      {/* Financial Overview */}

      <Grid container spacing={3}>
        {[
          { title: "Income", value: transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: "#2E7D32" },
          { title: "Expenses", value: Math.abs(transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0)).toFixed(2), color: "#D4A017" },
          { title: "Balance", value: transactions.reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: transactions.reduce((sum, txn) => sum + txn.amount, 0) >= 0 ? "#2E7D32" : "#D4A017" },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "transform 0.2s ease-in-out", "&:hover": { transform: "translateY(-5px)" }, padding: 2 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", color: "#1E2A44" }}>
                  {item.title}
                </Typography>

                <Typography variant="h5" sx={{ color: item.color, fontFamily: "'Lora', serif" }}>
                  {item.value}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Transactions List */}

      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2, fontFamily: "'Lora', serif", color: "#1E2A44" }}>
        Recent Transactions
      </Typography>

      <Grid container spacing={3}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", 
                alignItems: "center", 
                padding: 2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", color: "#1E2A44" }}>
                  {transaction.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: transaction.amount < 0 ? "#D4A017" : "#2E7D32", fontFamily: "'Lora', serif" }}
                >
                  {transaction.amount < 0 ? `-${Math.abs(transaction.amount).toFixed(2)}` : `+${transaction.amount.toFixed(2)}`}
                </Typography>
                <Typography variant="caption" sx={{ color: "#4A5568" }}>
                  {transaction.category}
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleDeleteTransaction(index)} sx={{ color: "#D4A017" }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Spending Chart */}
      <Typography 
        variant="h5" 
        sx={{ marginTop: 4, marginBottom: 2, fontFamily: "'Lora', serif", color: "#1E2A44" }}
      >
        Spending Breakdown
      </Typography>
      <Card 
        sx={{ 
          backgroundColor: "#FFFFFF", 
          borderRadius: "12px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
          padding: 4 
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1E2A44", 
                color: "#F8F1E9", 
                borderRadius: "8px", 
                fontFamily: "'Montserrat', sans-serif" 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default Dashboard;