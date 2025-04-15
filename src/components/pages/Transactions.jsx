import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  CssBaseline,
  Divider,
  Badge,
  Chip,
  Paper,
  InputBase,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Home,
  Search,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  CalendarToday,
  MoreVert,
  Add,
  Notifications,
  Settings,
  Sort,
  Download,
  Print,
} from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
// import "../../assets/css/transactions.css";
import PropTypes from "prop-types";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    amount: "",
    type: "",
    description: "",
    userId: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#4CAF50",
          },
          secondary: {
            main: "#2196F3",
          },
          background: {
            default: darkMode ? "#121212" : "#F5F7FA",
            paper: darkMode ? "#1E1E1E" : "#FFFFFF",
          },
        },
        typography: {
          fontFamily:
            "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
          h4: {
            fontWeight: 700,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 8,
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "/gettransactions/" + localStorage.getItem("id")
      );
      setTransactions(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
      toast.error("Failed to fetch transactions. Please try again later.");
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
        setNewTransaction({
          category: "",
          amount: "",
          type: "",
          description: "",
          userId: localStorage.getItem("id"),
        });
      }
    } catch (error) {
      console.error("Error adding Transaction:", error.response?.data);
      toast.error("Failed to add new transaction.");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`/deletetransaction/${id}`);
      toast.success("Transaction deleted successfully!");
      setTransactions(transactions.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (txn) =>
          txn.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((txn) => txn.type === filterType);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortBy === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

    return result;
  }, [transactions, searchTerm, filterType, sortBy, sortOrder]);

  // Calculate transaction statistics
  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((txn) => txn.type === "Income")
      .reduce((sum, txn) => sum + Number(txn.amount), 0);

    const totalExpenses = transactions
      .filter((txn) => txn.type === "Expense")
      .reduce((sum, txn) => sum + Number(txn.amount), 0);

    const netBalance = totalIncome - totalExpenses;

    const categoryBreakdown = transactions.reduce((acc, txn) => {
    if (!acc[txn.category]) acc[txn.category] = 0;
      acc[txn.category] += Number(txn.amount);
    return acc;
  }, {});

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      categoryBreakdown,
    };
  }, [transactions]);

  // Prepare data for charts
  const pieData = useMemo(() => {
    return Object.entries(stats.categoryBreakdown)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => ({
    name: key,
    value: Math.abs(value),
  }));
  }, [stats.categoryBreakdown]);

  // Prepare data for bar chart (monthly income vs expenses)
  const barChartData = useMemo(() => {
    const monthlyData = {};

    transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expenses: 0 };
      }

      if (txn.type === "Income") {
        monthlyData[monthYear].income += Number(txn.amount);
      } else {
        monthlyData[monthYear].expenses += Number(txn.amount);
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      name: month,
      income: data.income,
      expenses: data.expenses,
    }));
  }, [transactions]);

  // Prepare data for line chart (net balance trend)
  const lineChartData = useMemo(() => {
    const monthlyData = {};

    transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expenses: 0 };
      }

      if (txn.type === "Income") {
        monthlyData[monthYear].income += Number(txn.amount);
      } else {
        monthlyData[monthYear].expenses += Number(txn.amount);
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      name: month,
      balance: data.income - data.expenses,
    }));
  }, [transactions]);

  const COLORS = [
    "#4B8DDA",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#2E7D32",
    "#9C27B0",
    "#FF9800",
    "#795548",
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
            Amount: {payload[0].value.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            Percentage:{" "}
            {((payload[0].value / stats.totalExpenses) * 100).toFixed(1)}%
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className={`transactions-container ${darkMode ? "dark-mode" : ""}`}
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Sidebar */}
        <Box 
          className="transactions-sidebar"
          sx={{
            width: "250px",
            height: "100vh",
            padding: 2,
            backgroundColor: darkMode ? "#121212" : "#F7FAFC",
            color: "text.primary",
            position: "fixed",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            zIndex: 1000,
          }}
        >
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
              },
              {
                text: "Transactions",
                icon: <ReceiptLongIcon />,
                route: "/transactions",
                active: true,
              },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => navigate(item.route)}
                className={item.active ? "active" : ""}
              >
                {item.icon} <ListItemText primary={item.text} sx={{ ml: 1 }} />
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
        <Box
          className="transactions-main"
          sx={{ flexGrow: 1, ml: "260px", p: 4 }}
        >
          {/* Header */}
          <Box className="transactions-header">
            <Box>
              <Typography className="transactions-title" variant="h4">
                Transactions
              </Typography>
              <Typography className="transactions-subtitle" variant="body1">
                Manage and track your financial transactions
              </Typography>
            </Box>
            <Box className="transactions-actions">
              <Box className="transactions-search">
                <Search sx={{ color: "text.secondary" }} />
                <InputBase
                  placeholder="Search transactions..."
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
                title: "Total Income",
                value: stats.totalIncome.toFixed(2),
                color: "#2E7D32",
                icon: <TrendingUp />,
                change: "+12.5%",
                changeType: "positive",
              },
              {
                title: "Total Expenses",
                value: stats.totalExpenses.toFixed(2),
                color: "#FF4D4D",
                icon: <TrendingDown />,
                change: "-3.2%",
                changeType: "negative",
              },
              {
                title: "Net Balance",
                value: stats.netBalance.toFixed(2),
                color: stats.netBalance >= 0 ? "#2E7D32" : "#FF4D4D",
                icon: <AttachMoney />,
                change: stats.netBalance >= 0 ? "+8.3%" : "-5.7%",
                changeType: stats.netBalance >= 0 ? "positive" : "negative",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="transactions-card">
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={item.change}
                        size="small"
                        sx={{
                          bgcolor:
                            item.changeType === "positive"
                              ? "#E8F5E915"
                              : "#FFEBEE15",
                          color:
                            item.changeType === "positive"
                              ? "#2E7D32"
                              : "#FF4D4D",
                          fontWeight: 600,
                          mr: 1,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        vs last month
          </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Add Transaction Form */}
          <Card className="transactions-form">
            <Box className="transactions-form-title">
              <Add sx={{ color: "#4CAF50" }} />
              <Typography variant="h6">Add New Transaction</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box className="transactions-form-fields">
              <Select
                name="category"
                value={newTransaction.category}
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
                value={newTransaction.type}
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
                value={newTransaction.amount}
                onChange={handleInputChange}
                fullWidth
                // InputProps={{
                //   startAdornment: (
                //     <AttachMoney sx={{ color: "text.secondary", mr: 1 }} />
                //   ),
                // }}
              />
              <TextField
                name="description"
                label="Description"
                value={newTransaction.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box className="transactions-form-actions">
              <Button
                onClick={handleAddTransaction}
                variant="contained"
                startIcon={<Add />}
                sx={{ bgcolor: "#4CAF50" }}
              >
                Add Transaction
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
                <MenuItem value="all">All Transactions</MenuItem>
                <MenuItem value="Income">Income Only</MenuItem>
                <MenuItem value="Expense">Expenses Only</MenuItem>
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="date">Sort by Date</MenuItem>
                <MenuItem value="amount">Sort by Amount</MenuItem>
                <MenuItem value="category">Sort by Category</MenuItem>
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
              <Tooltip title="Export Transactions">
                <IconButton size="small">
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Print Transactions">
                <IconButton size="small">
                  <Print />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Transaction List */}
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
          ) : filteredTransactions.length > 0 ? (
          <Grid container spacing={3}>
              {filteredTransactions.map((transaction) => (
                <Grid item xs={12} md={6} lg={4} key={transaction._id}>
                  <Card className="transactions-card">
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
                            className="transactions-icon"
                            sx={{
                              bgcolor:
                                transaction.type === "Income"
                                  ? "#2E7D3215"
                                  : "#FF4D4D15",
                              color:
                                transaction.type === "Income"
                                  ? "#2E7D32"
                                  : "#FF4D4D",
                            }}
                          >
                            {transaction.type === "Income" ? (
                              <TrendingUp />
                            ) : (
                              <TrendingDown />
                            )}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {transaction.category}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {transaction.description}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteTransaction(transaction._id)
                          }
                          sx={{ color: "#FF4D4D" }}
                        >
                    <DeleteIcon />
                  </IconButton>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          className={`transactions-amount ${
                            transaction.type === "Income" ? "income" : "expense"
                          }`}
                          variant="h6"
                        >
                          {Math.abs(transaction.amount).toFixed(2)}
                        </Typography>
                        <Chip
                          label={transaction.type}
                          size="small"
                          sx={{
                            bgcolor:
                              transaction.type === "Income"
                                ? "#E8F5E915"
                                : "#FFEBEE15",
                            color:
                              transaction.type === "Income"
                                ? "#2E7D32"
                                : "#FF4D4D",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                No transactions found
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {searchTerm || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "Add your first transaction to get started"}
              </Typography>
            </Box>
          )}

          {/* Charts */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card className="transactions-chart">
                <Box className="transactions-chart-title">
                  <MonetizationOnIcon sx={{ color: "#4CAF50" }} />
                  <Typography variant="h6">Spending Breakdown</Typography>
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
              <Card className="transactions-chart">
                <Box className="transactions-chart-title">
                  <CalendarToday sx={{ color: "#2196F3" }} />
                  <Typography variant="h6">
                    Monthly Income vs Expenses
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
                    <Bar dataKey="income" name="Income" fill="#2E7D32" />
                    <Bar dataKey="expenses" name="Expenses" fill="#FF4D4D" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12}>
              <Card className="transactions-chart">
                <Box className="transactions-chart-title">
                  <TrendingUp sx={{ color: "#9C27B0" }} />
                  <Typography variant="h6">Net Balance Trend</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Net Balance"
                      stroke="#9C27B0"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Transactions;
