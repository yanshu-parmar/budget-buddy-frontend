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

const Budgets = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("/getbudgets");
      setBudgets(res.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBudget = async () => {
    if (!newBudget.category || !newBudget.amount || !newBudget.type || !newBudget.description) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await axios.post("/addtransactions", newBudget, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        toast.success("New Transaction added successfully!");
        setBudgets([...budgets, res.data]);
        setNewBudget({ category: "", amount: "", type: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding Budget:", error.response?.data);
      toast.error("Failed to add new budget. Please try again!");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axios.delete(`/deletebudget/${id}`);
      toast.success("Budget deleted successfully!");
      setBudgets(budgets.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete bbudget.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const categories = budgets.reduce((acc, txn) => {
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
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 4, textAlign: "center" }}>Budgets Overview</Typography>

        {/* Add Transaction Form */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
          <Select name="category" value={newBudget.category} onChange={handleInputChange} sx={{ minWidth: 150 }}>
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
          </Select>
          <Select name="type" value={newBudget.type} onChange={handleInputChange} sx={{ minWidth: 150 }}>
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
          <TextField name="amount" type="number" label="Amount" value={newBudget.amount} onChange={handleInputChange} />
          <TextField name="spend" type="number" label="Spend" value={newBudget.spend} onChange={handleInputChange} />
          <TextField name="description" label="Description" value={newBudget.description} onChange={handleInputChange} sx={{ width: "300px" }} />
          <Button onClick={handleAddBudget} variant="contained">Add Budget</Button>
        </Box>

        {/* Transactions List */}
        <Grid container spacing={3}>
          {budgets.map((budget) => (
            <Grid item md={4} key={budget._id}>
              <Card sx={{ padding: 2, position: "relative" }}>
                <IconButton onClick={() => handleDeleteBudget(budget._id)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                  <DeleteIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h6">{budget.category}</Typography>
                  <Typography variant="body1">Amount: {budget.amount}</Typography>
                  <Typography variant="body2">{budget.description}</Typography>
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

export default Budgets;