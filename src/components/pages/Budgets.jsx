  import { useState, useEffect, useMemo } from "react";
  import { useNavigate } from "react-router-dom";
  import PropTypes from "prop-types";
  import { Typography, Grid, Card, CardContent, IconButton, List, ListItem, ListItemText, Box, TextField, Button, Select, MenuItem, Avatar, Tooltip, CssBaseline, Divider, Badge, Paper, InputBase, CircularProgress, LinearProgress } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Home, Search, TrendingUp, TrendingDown, AttachMoney, CalendarToday, MoreVert, Add, Notifications, Settings, Sort, Download, Print } from "@mui/icons-material";
  import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
  import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
  import DashboardIcon from "@mui/icons-material/Dashboard";
  import LightModeIcon from "@mui/icons-material/LightMode";
  import DarkModeIcon from "@mui/icons-material/DarkMode";
  import { ThemeProvider, createTheme } from "@mui/material/styles";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

  const Budgets = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({ category: "", amount: "", type: "", description: "", spend: "" });
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("amount");
    const [sortOrder, setSortOrder] = useState("desc");

    const theme = useMemo(() => createTheme({ palette: { mode: darkMode ? "dark" : "light", primary: { main: "#4CAF50" }, secondary: { main: "#2196F3" }, background: { default: darkMode ? "#121212" : "#F5F7FA", paper: darkMode ? "#1E1E1E" : "#FFFFFF" } }, typography: { fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif", h4: { fontWeight: 700 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 } }, shape: { borderRadius: 12 }, components: { MuiButton: { styleOverrides: { root: { textTransform: "none", borderRadius: 8, fontWeight: 600 } } }, MuiCard: { styleOverrides: { root: { borderRadius: 16, boxShadow: darkMode ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.08)" }, }, }, }, }), [darkMode] );

    useEffect(() => { fetchBudgets() }, []);

    const fetchBudgets = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/getbudgets");
        setBudgets(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setLoading(false);
        toast.error("Failed to fetch budgets. Please try again later.");
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewBudget((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddBudget = async () => {
      if (
        !newBudget.category ||
        !newBudget.amount ||
        !newBudget.type ||
        !newBudget.description
      ) {
        toast.error("Please fill out all fields!");
        return;
      }

      try {
        const res = await axios.post("/addbudget", newBudget, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 201) {
          toast.success("New Budget added successfully!");
          setBudgets([...budgets, res.data]);
          setNewBudget({
            category: "",
            amount: "",
            type: "",
            description: "",
            spend: "",
          });
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
        toast.error("Failed to delete budget.");
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    // Calculate budget statistics
    const stats = useMemo(() => {
      const totalBudget = budgets.reduce(
        (sum, budget) => sum + Number(budget.amount),
        0
      );
      const totalSpent = budgets.reduce(
        (sum, budget) => sum + Number(budget.spend || 0),
        0
      );
      const remaining = totalBudget - totalSpent;
      const percentageSpent =
        totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

      return {
        totalBudget,
        totalSpent,
        remaining,
        percentageSpent,
      };
    }, [budgets]);

    // Prepare data for pie chart
    const pieData = useMemo(() => {
      const categoryData = budgets.reduce((acc, budget) => {
        if (!acc[budget.category]) acc[budget.category] = 0;
        acc[budget.category] += Number(budget.amount);
        return acc;
      }, {});

      return Object.entries(categoryData).map(([key, value]) => ({
        name: key,
        value: Math.abs(value),
      }));
    }, [budgets]);

    // Prepare data for bar chart (budget vs spent)
    const barChartData = useMemo(() => {
      return budgets.map((budget) => ({
        name: budget.category,
        budget: Number(budget.amount),
        spent: Number(budget.spend || 0),
      }));
    }, [budgets]);

    const COLORS = [
      "#4B8DDA",
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#2E7D32",
      "#9C27B0",
      "#FF9800",
      "#795548",
      "#607D8B",
      "#E91E63",
    ];

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {payload[0].name}
            </Typography>
            <Typography variant="body2">
              Amount: ${payload[0].value.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Percentage:{" "}
              {((payload[0].value / stats.totalBudget) * 100).toFixed(1)}%
            </Typography>
          </Paper>
        );
      }
      return null;
    };

    CustomTooltip.propTypes = {
      active: PropTypes.bool,
      payload: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.number,
        })
      ),
    };

    // Filter and sort budgets
    const filteredBudgets = useMemo(() => {
      let result = [...budgets];

      // Apply search filter
      if (searchTerm) {
        result = result.filter(
          (budget) =>
            budget.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            budget.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply type filter
      if (filterType !== "all") {
        result = result.filter((budget) => budget.type === filterType);
      }

      // Apply sorting
      result.sort((a, b) => {
        if (sortBy === "amount") {
          return sortOrder === "asc"
            ? Number(a.amount) - Number(b.amount)
            : Number(b.amount) - Number(a.amount);
        } else if (sortBy === "category") {
          return sortOrder === "asc"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        } else if (sortBy === "spend") {
          return sortOrder === "asc"
            ? Number(a.spend || 0) - Number(b.spend || 0)
            : Number(b.spend || 0) - Number(a.spend || 0);
        }
        return 0;
      });

      return result;
    }, [budgets, searchTerm, filterType, sortBy, sortOrder]);

    // Get budget status (under, warning, over)
    const getBudgetStatus = (budget) => {
      const spent = Number(budget.spend || 0);
      const amount = Number(budget.amount);
      const percentage = amount > 0 ? (spent / amount) * 100 : 0;

      if (percentage < 70) return "under";
      if (percentage < 90) return "warning";
      return "over";
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          className={`budgets-container ${darkMode ? "dark-mode" : ""}`}
          sx={{ display: "flex", minHeight: "100vh" }}
        >
          {/* Sidebar */}
          <Box className="budgets-sidebar">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar sx={{ bgcolor: "#4CAF50", mr: 2, width: 40, height: 40 }}>
                Y
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  yanshuparmar17
                </Typography>
              </Box>
            </Box>

            <List>
              {[
                { text: "Home", icon: <Home />, route: "/landingpage" },
                {
                  text: "Dashboard",
                  icon: <DashboardIcon />,
                  route: "/dashboard",
                },
                {
                  text: "Budgets",
                  icon: <MonetizationOnIcon />,
                  route: "/budgets",
                  active: true,
                },
                {
                  text: "Transactions",
                  icon: <ReceiptLongIcon />,
                  route: "/transactions",
                },
              ].map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.route)}
                  className={item.active ? "active" : ""}
                >
                  {item.icon}
                  <ListItemText primary={item.text} sx={{ ml: 1 }} />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: "auto", mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  width: "100%",
                  bgcolor: "#FF4D4D",
                  color: "#FFFFFF",
                  "&:hover": {
                    bgcolor: "#E53935",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Main Content */}
          <Box className="budgets-main" sx={{ flexGrow: 1, ml: "260px", p: 4 }}>
            {/* Header */}
            <Box className="budgets-header">
              <Box>
                <Typography className="budgets-title" variant="h4">
                  Budgets Overview
                </Typography>
                <Typography className="budgets-subtitle" variant="body1">
                  Manage and track your financial budgets
                </Typography>
              </Box>
              <Box className="budgets-actions">
                <Box className="budgets-search">
                  <Search sx={{ color: "text.secondary" }} />
                  <InputBase
                    placeholder="Search budgets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                  />
                </Box>
                <IconButton>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Settings />
                </IconButton>
                <Tooltip
                  title={
                    darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                    color="inherit"
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  title: "Total Budget",
                  value: `$${stats.totalBudget.toFixed(2)}`,
                  color: "#4CAF50",
                  icon: <AttachMoney />,
                },
                {
                  title: "Total Spent",
                  value: `$${stats.totalSpent.toFixed(2)}`,
                  color: "#FF9800",
                  icon: <TrendingDown />,
                },
                {
                  title: "Remaining",
                  value: `$${stats.remaining.toFixed(2)}`,
                  color: stats.remaining >= 0 ? "#2196F3" : "#F44336",
                  icon: <TrendingUp />,
                },
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card className="budgets-card">
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          className="card-icon"
                          sx={{ bgcolor: `${item.color}15` }}
                        >
                          {item.icon}
                        </Box>
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ color: item.color, fontWeight: 700, mb: 1 }}
                      >
                        {item.value}
                      </Typography>
                      {index === 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Budget Utilization: {stats.percentageSpent.toFixed(1)}
                            %
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(stats.percentageSpent, 100)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "rgba(0,0,0,0.1)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  stats.percentageSpent > 90
                                    ? "#F44336"
                                    : stats.percentageSpent > 70
                                    ? "#FF9800"
                                    : "#4CAF50",
                              },
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Add Budget Form */}
            <Card className="budgets-form">
              <Box className="budgets-form-title">
                <Add sx={{ color: "#4CAF50" }} />
                <Typography variant="h6">Add New Budget</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box className="budgets-form-fields">
                <Select
                  name="category"
                  value={newBudget.category}
                  onChange={handleInputChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Bills">Bills</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <Select
                  name="type"
                  value={newBudget.type}
                  onChange={handleInputChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
                <TextField
                  name="amount"
                  type="number"
                  label="Amount"
                  value={newBudget.amount}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  name="spend"
                  type="number"
                  label="Spent"
                  value={newBudget.spend}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  name="description"
                  label="Description"
                  value={newBudget.description}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box className="budgets-form-actions">
                <Button
                  onClick={handleAddBudget}
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ bgcolor: "#4CAF50" }}
                >
                  Add Budget
                </Button>
              </Box>
            </Card>

            {/* Filters and Sort */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  size="small"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="all">All Budgets</MenuItem>
                  <MenuItem value="Income">Income Only</MenuItem>
                  <MenuItem value="Expense">Expenses Only</MenuItem>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="small"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="amount">Sort by Amount</MenuItem>
                  <MenuItem value="category">Sort by Category</MenuItem>
                  <MenuItem value="spend">Sort by Spent</MenuItem>
                </Select>
                <IconButton
                  size="small"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  <Sort
                    sx={{
                      transform: sortOrder === "asc" ? "rotate(180deg)" : "none",
                    }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Export Budgets">
                  <IconButton size="small">
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Print Budgets">
                  <IconButton size="small">
                    <Print />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Budget Cards */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : filteredBudgets.length > 0 ? (
              <Grid container spacing={3}>
                {filteredBudgets.map((budget) => {
                  const status = getBudgetStatus(budget);
                  const spent = Number(budget.spend || 0);
                  const amount = Number(budget.amount);
                  const percentage = amount > 0 ? (spent / amount) * 100 : 0;

                  return (
                    <Grid item xs={12} md={6} lg={4} key={budget._id}>
                      <Card className="budgets-card">
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                className="budgets-icon"
                                sx={{
                                  bgcolor:
                                    status === "under"
                                      ? "#4CAF5015"
                                      : status === "warning"
                                      ? "#FF980015"
                                      : "#F4433615",
                                  color:
                                    status === "under"
                                      ? "#4CAF50"
                                      : status === "warning"
                                      ? "#FF9800"
                                      : "#F44336",
                                }}
                              >
                                {status === "under" ? (
                                  <TrendingUp />
                                ) : status === "warning" ? (
                                  <TrendingDown />
                                ) : (
                                  <AttachMoney />
                                )}
                              </Box>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {budget.category}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "text.secondary" }}
                                >
                                  {budget.description}
                                </Typography>
                              </Box>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteBudget(budget._id)}
                              sx={{ color: "#FF4D4D" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography variant="body2" color="text.secondary">
                                Budget: ${amount.toFixed(2)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Spent: ${spent.toFixed(2)}
                              </Typography>
                            </Box>
                            <Box className="budgets-progress">
                              <Box
                                className={`budgets-progress-bar ${status}`}
                                sx={{
                                  width: `${Math.min(percentage, 100)}%`,
                                }}
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                              }}
                            >
                              <Typography
                                className={`budgets-amount ${status}`}
                                variant="body2"
                              >
                                {percentage.toFixed(1)}% used
                              </Typography>
                              <Typography
                                className={`budgets-amount ${status}`}
                                variant="body2"
                              >
                                ${(amount - spent).toFixed(2)} remaining
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                  No budgets found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {searchTerm || filterType !== "all"
                    ? "Try adjusting your search or filters"
                    : "Add your first budget to get started"}
                </Typography>
              </Box>
            )}

            {/* Charts */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {/* Pie Chart */}
              <Grid item xs={12} md={6}>
                <Card className="budgets-chart">
                  <Box className="budgets-chart-title">
                    <MonetizationOnIcon sx={{ color: "#4CAF50" }} />
                    <Typography variant="h6">Budget Breakdown</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>

              {/* Bar Chart */}
              <Grid item xs={12} md={6}>
                <Card className="budgets-chart">
                  <Box className="budgets-chart-title">
                    <CalendarToday sx={{ color: "#2196F3" }} />
                    <Typography variant="h6">
                      Budget vs Spent by Category
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#4CAF50" />
                      <Bar dataKey="spent" name="Spent" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    );
  };

  export default Budgets;