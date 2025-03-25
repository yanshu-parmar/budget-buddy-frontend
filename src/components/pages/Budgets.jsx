import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton, Drawer, 
  List, ListItem, ListItemText, Box, TextField, Button, Select, MenuItem
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Budgets = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    { category: "Food", budget: 500, spent: 320, description: "Groceries & dining out" },
    { category: "Transport", budget: 200, spent: 120, description: "Fuel & public transport" },
    { category: "Entertainment", budget: 150, spent: 90, description: "Movies, games, and outings" },
  ]);
  const [newBudget, setNewBudget] = useState({ category: "", budget: "", spent: "", description: "" });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDeleteBudget = (index) => {
    setBudgets(budgets.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budget && newBudget.spent !== "" && newBudget.description) {
      setBudgets([...budgets, { ...newBudget, budget: Number(newBudget.budget), spent: Number(newBudget.spent) }]);
      setNewBudget({ category: "", budget: "", spent: "", description: "" });
    }
  };

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff", padding: 4 }}>

      {/* Sidebar Toggle */}
      <IconButton onClick={toggleSidebar} sx={{ position: "fixed", top: 20, left: 20, color: "#d3ba2c", zIndex: 1000 }}>
        <ReorderIcon fontSize="large" />
      </IconButton>

      {/* Sidebar Navigation */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, backgroundColor: "#1e293b", height: "100vh", color: "#fff", padding: 2 }}>
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>Budget Buddy</Typography>
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
        Budgets Overview
      </Typography>

      {/* Add Budget Form */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
      <Select
        label="category"
          name="category"
          value={newBudget.category}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1, minWidth: 150 }}
        >
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Loan">Loan</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
        <TextField
          label="Total Budget"
          name="budget"
          type="number"
          value={newBudget.budget}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Spent"
          name="spent"
          type="number"
          value={newBudget.spent}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newBudget.description}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1, width: "300px" }}
        />
        <Button onClick={handleAddBudget} variant="contained" sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold" }}>
          Add Budget
        </Button>
      </Box>

      {/* Budget List with Individual Charts */}
      <Grid container spacing={3}>
        {budgets.map((budget, index) => {
          const remaining = budget.budget - budget.spent;
          const chartData = [
            { name: "Spent", value: budget.spent },
            { name: "Remaining", value: remaining }
          ];

          return (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ backgroundColor: "#1e293b", color: "#fff", padding: 2, position: "relative" }}>
                <IconButton onClick={() => handleDeleteBudget(index)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                  <DeleteIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h6">{budget.category}</Typography>
                  <Typography variant="body1" sx={{ color: "#00C49F" }}>
                    Budget: {budget.budget}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#e53935" }}>
                    Spent: {budget.spent}
                  </Typography>
                  <Typography variant="body1" sx={{ color: remaining >= 0 ? "#43a047" : "#e53935" }}>
                    Remaining: {remaining}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#d3ba2c", fontStyle: "italic" }}>
                    {budget.description}
                  </Typography>
                  <PieChart width={200} height={200}>
                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                      {chartData.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Budgets;