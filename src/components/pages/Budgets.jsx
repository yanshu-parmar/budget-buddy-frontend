import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Budgets = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editBudgetId, setEditBudgetId] = useState(null);
  const [budgetData, setBudgetData] = useState({
    category: "",
    budget: "",
    spent: "",
    description: "",
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("/getbudget");
      setBudgets(res.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudgetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateBudget = async () => {
    if (!budgetData.category || !budgetData.budget || budgetData.spent === "" || !budgetData.description) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      if (editBudgetId) {
        // Update existing budget
        await axios.put(`/updatebudget/${editBudgetId}`, budgetData);
        toast.success("Budget updated successfully!");
      } else {
        // Add new budget
        const res = await axios.post("/addbudget", budgetData);
        if (res.status === 201) toast.success("New Budget added successfully!");
      }
      fetchBudgets();
      setBudgetData({ category: "", budget: "", spent: "", description: "" });
      setEditBudgetId(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget. Please try again!");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axios.delete(`/deletebudget/${id}`);
      toast.success("Budget deleted successfully!");
      setBudgets(budgets.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget.");
    }
  };

  const handleEditBudget = (budget) => {
    setEditBudgetId(budget._id);
    setBudgetData({
      category: budget.category,
      budget: budget.budget,
      spent: budget.spent,
      description: budget.description,
    });
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditBudgetId(null);
    setShowAddForm(false);
    setBudgetData({ category: "", budget: "", spent: "", description: "" });
  };

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer anchor="left" variant="permanent" sx={{ width: 250, flexShrink: 0 }}>
        <Box sx={{ width: 250, height: "100vh", backgroundColor: "#1A1A1A", color: "#FFFFFF", padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>Y</Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>yanshuparmar17</Typography>
          </Box>
          <List>
            {[{ text: "Home", icon: <HomeIcon />, route: "/dashboard" },
              { text: "Budgets", icon: <AccountBalanceWalletIcon />, route: "/budgets" },
              { text: "Transactions", icon: <ReceiptIcon />, route: "/transactions" }].map((item, index) => (
                <ListItem button key={index} onClick={() => navigate(item.route)}>
                  {item.icon} <ListItemText primary={item.text} />
                </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ minHeight: "100vh", padding: 4, marginLeft: "25px" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 4, textAlign: "center" }}>
          Budgets Overview
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowAddForm(!showAddForm)} sx={{ marginBottom: 3 }}>
          {showAddForm ? "Cancel" : editBudgetId ? "Edit Budget" : "Add Budget"}
        </Button>

        {showAddForm && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 4 }}>
            <Select name="category" value={budgetData.category} onChange={handleInputChange} sx={{ minWidth: 150 }}>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Groceries">Groceries</MenuItem>
            </Select>
            <TextField name="budget" type="number" label="Total Budget" value={budgetData.budget} onChange={handleInputChange} />
            <TextField name="spent" type="number" label="Spent" value={budgetData.spent} onChange={handleInputChange} />
            <TextField name="description" label="Description" value={budgetData.description} onChange={handleInputChange} sx={{ width: "300px" }} />
            <Button onClick={handleAddOrUpdateBudget} variant="contained">{editBudgetId ? "Save Changes" : "Add Budget"}</Button>
            {editBudgetId && <Button onClick={handleCancelEdit} variant="outlined">Cancel</Button>}
          </Box>
        )}

        <Grid container spacing={3}>
          {budgets.map((budget) => {
            const remaining = Math.max(budget.budget - budget.spent, 0);
            const pieData = [
              { name: "Remaining", value: remaining },
              { name: "Spent", value: budget.spent },
            ];
            
            return (
              <Grid item md={4} key={budget._id}>
                <Card sx={{ padding: 2, position: "relative" }}>
                  <IconButton onClick={() => handleEditBudget(budget)} sx={{ position: "absolute", top: 10, right: 50, color: "#FFA726" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBudget(budget._id)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                    <DeleteIcon />
                  </IconButton>
                  <CardContent>
                    <Typography variant="h6">{budget.category}</Typography>
                    <Typography variant="body1">Budget: {budget.budget}</Typography>
                    <Typography variant="body1">Spent: {budget.spent}</Typography>
                    <Typography variant="body2">{budget.description}</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Budgets;