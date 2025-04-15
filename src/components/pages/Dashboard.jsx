import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Avatar,
  CssBaseline,
  IconButton,
  Tooltip,
  Divider,
  Badge,
  Chip,
  Paper,
  InputBase,
  CircularProgress,
} from "@mui/material";
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
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
// import "../../assets/css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
    setLoading(true);
    Promise.all([
      axios.get("/api/transactions/monthly"),
      axios.get("/api/transactions"),
    ])
      .then(([monthlyRes, transactionsRes]) => {
        setMonthlyData(monthlyRes.data);
        setTransactions(transactionsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

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

  // Prepare data for bar chart (monthly income vs expenses)
  const barChartData = monthlyData.map((month) => ({
    name: month.month || "Unknown",
    income: month.totalIncome || 0,
    expenses: Math.abs(month.totalExpense || 0),
  }));

  // Prepare data for line chart (net balance trend)
  const lineChartData = monthlyData.map((month) => ({
    name: month.month || "Unknown",
    balance: (month.totalIncome || 0) - Math.abs(month.totalExpense || 0),
  }));

  // Calculate total income, expenses, and net balance
  const totalIncome = monthlyData.reduce(
    (sum, month) => sum + (month.totalIncome || 0),
    0
  );
  const totalExpenses = Math.abs(
    monthlyData.reduce((sum, month) => sum + (month.totalExpense || 0), 0)
  );
  const netBalance = totalIncome - totalExpenses;

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

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
            Percentage: {((payload[0].value / totalExpenses) * 100).toFixed(1)}%
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
        className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Sidebar */}
        <Box
          className="dashboard-sidebar"
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
                active: true,
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
        <Box className="dashboard-main" sx={{ flexGrow: 1, ml: "260px", p: 4 }}>
          {/* Header */}
          <Box className="dashboard-header">
            <Box>
              <Typography className="dashboard-title" variant="h4">
                Financial Dashboard
              </Typography>
              <Typography className="dashboard-subtitle" variant="body1">
                Welcome back! Here&apos;s your financial overview
              </Typography>
            </Box>
            <Box className="dashboard-actions">
              <Box className="dashboard-search">
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
          ) : (
            <>
              {/* Summary Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  {
                    title: "Total Income",
                    value: totalIncome.toFixed(2),
                    color: "#2E7D32",
                    icon: <TrendingUp />,
                    change: "+12.5%",
                    changeType: "positive",
                  },
                  {
                    title: "Total Expenses",
                    value: totalExpenses.toFixed(2),
                    color: "#FF4D4D",
                    icon: <TrendingDown />,
                    change: "-3.2%",
                    changeType: "negative",
                  },
                  {
                    title: "Net Balance",
                    value: netBalance.toFixed(2),
                    color: netBalance >= 0 ? "#2E7D32" : "#FF4D4D",
                    icon: <AttachMoney />,
                    change: netBalance >= 0 ? "+8.3%" : "-5.7%",
                    changeType: netBalance >= 0 ? "positive" : "negative",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card className="dashboard-card">
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

              {/* Charts Row */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Pie Chart */}
                <Grid item xs={12} md={6}>
                  <Card className="dashboard-chart">
                    <Box className="dashboard-chart-title">
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
                  <Card className="dashboard-chart">
                    <Box className="dashboard-chart-title">
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
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" name="Income" fill="#2E7D32" />
                        <Bar
                          dataKey="expenses"
                          name="Expenses"
                          fill="#FF4D4D"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid>
              </Grid>

              {/* Line Chart and Recent Transactions */}
              <Grid container spacing={3}>
                {/* Line Chart */}
                <Grid item xs={12} md={8}>
                  <Card className="dashboard-chart">
                    <Box className="dashboard-chart-title">
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
                        <Tooltip />
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

                {/* Recent Transactions */}
                <Grid item xs={12} md={4}>
                  <Card className="dashboard-chart">
                    <Box
                      className="dashboard-chart-title"
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ReceiptLongIcon sx={{ color: "#FF9800" }} />
                        <Typography variant="h6">
                          Recent Transactions
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        size="small"
                        endIcon={<Add />}
                        onClick={() => navigate("/transactions")}
                      >
                        View All
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box className="dashboard-transaction-list">
                      {recentTransactions.length > 0 ? (
                        recentTransactions.map((txn, index) => (
                          <Box
                            key={index}
                            className="dashboard-transaction-item"
                          >
                            <Box
                              className="dashboard-transaction-icon"
                              sx={{
                                bgcolor:
                                  txn.amount >= 0 ? "#2E7D3215" : "#FF4D4D15",
                                color: txn.amount >= 0 ? "#2E7D32" : "#FF4D4D",
                              }}
                            >
                              {txn.amount >= 0 ? (
                                <TrendingUp />
                              ) : (
                                <TrendingDown />
                              )}
                            </Box>
                            <Box className="dashboard-transaction-details">
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600 }}
                              >
                                {txn.category}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {txn.description}
                              </Typography>
                            </Box>
                            <Typography
                              className={`dashboard-transaction-amount ${
                                txn.amount >= 0 ? "income" : "expense"
                              }`}
                            >
                              {Math.abs(txn.amount).toFixed(2)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            py: 2,
                            color: "text.secondary",
                          }}
                        >
                          No recent transactions
                        </Typography>
                      )}
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;