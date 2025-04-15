import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Flag as FlagIcon, 
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../../assets/css/goals.css";

const Goals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "",
    priority: "medium",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get("/api/goals");
      setGoals(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (goal = null) => {
    if (goal) {
      setSelectedGoal(goal);
      setFormData({
        title: goal.title,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline,
        category: goal.category,
        priority: goal.priority,
      });
    } else {
      setSelectedGoal(null);
      setFormData({
        title: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
        category: "",
        priority: "medium",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGoal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedGoal) {
        await axios.put(`/api/goals/${selectedGoal._id}`, formData);
      } else {
        await axios.post("/api/goals", formData);
      }
      fetchGoals();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleDelete = async (goalId) => {
    try {
      await axios.delete(`/api/goals/${goalId}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return "over";
    if (progress >= 75) return "warning";
    return "under";
  };

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="goals-container">
      <Box className="goals-header">
        <Box>
          <Typography variant="h4" className="goals-title">
            Financial Goals
          </Typography>
          <Typography variant="subtitle1" className="goals-subtitle">
            Track and manage your financial objectives
          </Typography>
        </Box>
        <Box className="goals-actions">
          <Box className="goals-search">
            <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Goal
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredGoals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal._id}>
            <Card className="goals-card">
              <CardContent>
                <Box className="card-header">
                  <Box className="card-icon" sx={{ bgcolor: "primary.light" }}>
                    <FlagIcon sx={{ color: "primary.main" }} />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(goal)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {goal.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Target: ${goal.targetAmount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current: ${goal.currentAmount}
                  </Typography>
                </Box>
                <Box className="goals-progress">
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(
                      goal.currentAmount,
                      goal.targetAmount
                    )}
                    className={`goals-progress-bar ${getProgressColor(
                      calculateProgress(goal.currentAmount, goal.targetAmount)
                    )}`}
                  />
                </Box>
                <Box className="card-footer">
                  <Typography variant="body2" color="text.secondary">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedGoal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Goal Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Amount"
                  name="targetAmount"
                  type="number"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Amount"
                  name="currentAmount"
                  type="number"
                  value={formData.currentAmount}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={selectedGoal ? <EditIcon /> : <AddIcon />}
          >
            {selectedGoal ? "Update" : "Add"} Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals;
