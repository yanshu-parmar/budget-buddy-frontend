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
import axios from "axios";
import { toast } from "react-toastify";

const Transactions = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff", padding: 4 }}>
      <IconButton onClick={toggleSidebar} sx={{ position: "fixed", top: 20, left: 20, color: "#d3ba2c", zIndex: 1000 }}>
        <ReorderIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, backgroundColor: "#1e293b", height: "100vh", color: "#fff", padding: 2 }}>
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>Budget Buddy</Typography>
          <List>
            <ListItem button onClick={() => navigate("/dashboard")}><ListItemText primary="Dashboard" /></ListItem>
            <ListItem button onClick={() => navigate("/budgets")}><ListItemText primary="Budgets" /></ListItem>
            <ListItem button onClick={() => navigate("/transactions")}><ListItemText primary="Transactions" /></ListItem>
          </List>
        </Box>
      </Drawer>

      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 4, color: "#d3ba2c", textAlign: "center" }}>Transactions Overview</Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
        <Select name="category" value={newTransaction.category} onChange={handleInputChange} sx={{ backgroundColor: "#fff", borderRadius: 1, minWidth: 150 }}>
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
        </Select>
        <Select name="type" value={newTransaction.type} onChange={handleInputChange} sx={{ backgroundColor: "#fff", borderRadius: 1, minWidth: 150 }}>
          <MenuItem value="">Select Type</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
        <TextField name="amount" type="number" label="Amount" value={newTransaction.amount} onChange={handleInputChange} sx={{ backgroundColor: "#fff", borderRadius: 1 }} />
        <TextField name="description" label="Description" value={newTransaction.description} onChange={handleInputChange} sx={{ backgroundColor: "#fff", borderRadius: 1, width: "300px" }} />
        <Button onClick={handleAddTransaction} variant="contained" sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold" }}>Add Transaction</Button>
      </Box>

      <Grid container spacing={3}>
        {transactions.map((transaction) => (
          <Grid item md={4} key={transaction._id}>
            <Card sx={{ backgroundColor: "#1e293b", color: "#fff", padding: 2, position: "relative" }}>
              <IconButton onClick={() => handleDeleteTransaction(transaction._id)} sx={{ position: "absolute", top: 10, right: 10, color: "#e53935" }}>
                <DeleteIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6">{transaction.category}</Typography>
                <Typography variant="body1" sx={{ color: transaction.type === "Income" ? "#00C49F" : "#FF4444" }}>Amount: {transaction.amount}</Typography>
                <Typography variant="body2" sx={{ color: "#d3ba2c", fontStyle: "italic" }}>{transaction.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Transactions;