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
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { toast } from "react-toastify";

const Budgets = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBudget = async () => {
    if (
      !newBudget.category ||
      !newBudget.budget ||
      newBudget.spent === "" ||
      !newBudget.description
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await axios.post("/addbudget", newBudget, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        toast.success("New Budget added successfully!");
        setBudgets([...budgets, res.data]);
        setNewBudget({ category: "", budget: "", spent: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding budget:", error.response?.data);
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
      toast.error("Failed to delete budget.");
    }
  };

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#fff",
        padding: 4,
      }}
    >
      {/* Sidebar Toggle */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          color: "#d3ba2c",
          zIndex: 1000,
        }}
      >
        <ReorderIcon fontSize="large" />
      </IconButton>

      {/* Sidebar Navigation */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#1e293b",
            height: "100vh",
            color: "#fff",
            padding: 2,
          }}
        >
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>
            Budget Buddy
          </Typography>
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
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ marginBottom: 4, color: "#d3ba2c", textAlign: "center" }}
      >
        Budgets Overview
      </Typography>

      {/* Add Budget Form */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <Select
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
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
        <TextField
          name="budget"
          type="number"
          label="Total Budget"
          value={newBudget.budget}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          name="spent"
          type="number"
          label="Spent"
          value={newBudget.spent}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          name="description"
          label="Description"
          value={newBudget.description}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1, width: "300px" }}
        />
        <Button
          onClick={handleAddBudget}
          variant="contained"
          sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold" }}
        >
          Add Budget
        </Button>
      </Box>

      {/* Budget List with Charts */}
      <Grid container spacing={3}>
        {budgets.map((budget) => {
          const remaining = budget.budget - budget.spent;
          const chartData = [
            { name: "Spent", value: budget.spent },
            { name: "Remaining", value: remaining },
          ];

          return (
            <Grid item xs={12} md={4} key={budget._id}>
              <Card
                sx={{
                  backgroundColor: "#1e293b",
                  color: "#fff",
                  padding: 2,
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => handleDeleteBudget(budget._id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "#e53935",
                  }}
                >
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
                  <Typography
                    variant="body1"
                    sx={{ color: remaining >= 0 ? "#43a047" : "#e53935" }}
                  >
                    Remaining: {remaining}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#d3ba2c", fontStyle: "italic" }}
                  >
                    {budget.description}
                  </Typography>
                  <PieChart width={200} height={200}>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
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