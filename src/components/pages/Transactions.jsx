import { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Home } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/gettransactions");
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
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.type || !newTransaction.description) {
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
        setNewTransaction({ category: "", amount: "", type: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data);
      toast.error("Failed to add new transaction. Please try again!");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`/deletetransaction/${id}`);
      toast.success("Transaction deleted successfully!");
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{
        width: "250px", height: "100vh", color: "#000", padding: 2, backgroundColor: "#f5f7fa", 
        position: "fixed", left: 0, top: 0, display: "flex", flexDirection: "column"}}>
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
      <Container maxWidth="xl" sx={{ minHeight: "100vh", padding: 4, marginLeft: "250px" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 4, textAlign: "center" }}>Transactions Overview</Typography>

        {/* Add Transaction Form */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
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

        {/* Transactions List */}
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
              <Tooltip formatter={(value, name) => [`${name}: $${value}`, "Category"]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Container>
    </Box>
  );
};

export default Transactions;