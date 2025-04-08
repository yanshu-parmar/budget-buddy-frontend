import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton,
  List, ListItem, ListItemText, Box, TextField, Button,
  Select, MenuItem, Avatar, Tooltip, CssBaseline
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Home } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    amount: "",
    type: "",
    description: "",
    userId:""
  });
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
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/gettransactions/"+ localStorage.getItem("id") );
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = async () => {
    const { category, amount, type, description } = newTransaction;
    if (!category || !amount || !type || !description) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await axios.post("/addtransactions", newTransaction, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        toast.success("New Transaction added successfully!");
        setTransactions([...transactions, res.data]);
        setNewTransaction({ category: "", amount: "", type: "", description: "", userId:"67f4a5f5f71cd138cdfe26ff" });
      }
    } catch (error) {
      console.error("Error adding Budget:", error.response?.data);
      toast.error("Failed to add new transaction.");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`/deletetransaction/${id}`);
      toast.success("Transaction deleted successfully!");
      setTransactions(transactions.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
            color: (theme) => theme.palette.text.primary,
            position: "fixed",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>Y</Avatar>
            <Typography variant="body1" fontWeight={600}>yanshuparmar17</Typography>
          </Box>

          <List>
            {[{ text: "Home", icon: <Home />, route: "/landingpage" },
            { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
            { text: "Budgets", icon: <MonetizationOnIcon />, route: "/budgets" },
            { text: "Transactions", icon: <ReceiptLongIcon />, route: "/transactions" }]
              .map((item, index) => (
                <ListItem button key={index} onClick={() => navigate(item.route)}>
                  {item.icon} <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>

          <Button variant="contained" onClick={handleLogout} sx={{ mt: "auto", bgcolor: "#FF4D4D" }}>
            Logout
          </Button>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ marginLeft: "250px", p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Transactions Overview
          </Typography>

          {/* Add Transaction Form */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
            <Select name="category" value={newTransaction.category} onChange={handleInputChange} sx={{ minWidth: 150 }}>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
            </Select>
            <Select name="type" value={newTransaction.type} onChange={handleInputChange} sx={{ minWidth: 150 }}>
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
            <TextField name="amount" type="number" label="Amount" value={newTransaction.amount} onChange={handleInputChange} />
            <TextField name="description" label="Description" value={newTransaction.description} onChange={handleInputChange} sx={{ width: "300px" }} />
            <Button onClick={handleAddTransaction} variant="contained">Add Transaction</Button>
          </Box>

          {/* Transaction List */}
          <Grid container spacing={3}>
            {transactions.map((transaction) => (
              <Grid item md={4} key={transaction._id}>
                <Card sx={{ padding: 2, position: "relative" }}>
                  <IconButton onClick={() => handleDeleteTransaction(transaction._id)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                    <DeleteIcon />
                  </IconButton>
                  <CardContent>
                    <Typography variant="h6">{transaction.category}</Typography>
                    <Typography variant="body1">Amount: {transaction.amount}</Typography>
                    <Typography variant="body2">{transaction.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pie Chart */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Spending Breakdown</Typography>
          <Card sx={{ padding: 4 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name }) => name}>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Transactions;
