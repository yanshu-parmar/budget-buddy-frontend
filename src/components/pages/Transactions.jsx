import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton, Drawer,
  List, ListItem, ListItemText, Box, TextField, Button, Select, MenuItem
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";

const Transactions = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { type: "Received", category: "Salary", amount: 1000, description: "March Salary", date: "2025-03-20" },
    { type: "Spent", category: "Food", amount: 200, description: "Groceries", date: "2025-03-21" },
    { type: "Spent", category: "Entertainment", amount: 50, description: "Movie", date: "2025-03-22" },
  ]);
  const [newTransaction, setNewTransaction] = useState({ type: "Spent", category: "", amount: "", description: "", date: "" });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.category && newTransaction.description && newTransaction.date) {
      setTransactions([...transactions, { ...newTransaction, amount: Number(newTransaction.amount) }]);
      setNewTransaction({ type: "Spent", category: "", amount: "", description: "", date: "" });
    }
  };

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
        Transactions
      </Typography>

      {/* Add Transaction Form */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
        <Select
          name="type"
          value={newTransaction.type}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1, minWidth: 120 }}
        >
          <MenuItem value="Spent">Spent</MenuItem>
          <MenuItem value="Received">Received</MenuItem>
        </Select>
        <Select
          name="category"
          value={newTransaction.category}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1, minWidth: 150 }}
        > Category
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={newTransaction.amount}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newTransaction.date}
          onChange={handleInputChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <Button onClick={handleAddTransaction} variant="contained" sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold" }}>
          Add Transaction
        </Button>
      </Box>

      {/* Transactions List */}
      <Grid container spacing={3}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#1e293b", color: "#fff", padding: 2, position: "relative" }}>
              <IconButton onClick={() => handleDeleteTransaction(index)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                <DeleteIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6" sx={{ color: transaction.type === "Received" ? "#43a047" : "#e53935" }}>
                  {transaction.type}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#00C49F" }}>
                  Amount: ${transaction.amount}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#d3ba2c" }}>
                  Category: {transaction.category}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "#d3ba2c" }}>
                  {transaction.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "#a2b2a7" }}>
                  Date: {transaction.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Transactions;