// // src/components/UserProfile.js
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import {
//   Typography, Button, Box, Container, Paper, TextField, IconButton, InputAdornment,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useThemeContext } from "../layouts/ThemeContext";

import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MenuIcon from "@mui/icons-material/Menu";

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const { themeMode, toggleTheme } = useThemeContext();
//   const { register, handleSubmit, reset } = useForm();
//   const [user, setUser] = useState({ name: "", email: "", createdAt: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   // Fetch user data on mount (mocked or from API)
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser({
//           name: res.data.name,
//           email: res.data.email,
//           createdAt: new Date(res.data.createdAt).toLocaleDateString(),
//         });
//         reset({ name: res.data.name }); // Pre-fill form with current name
//       } catch (error) {
//         console.error("Error fetching profile", error);
//         toast.error("Failed to load profile data.");
//       }
//     };
//     fetchUserData();
//   }, [reset]);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const submitHandler = async (data) => {
//     try {
//       const token = localStorage.getItem("token");
//       const updateData = {
//         name: data.name,
//         ...(data.password && { password: data.password }), // Only include password if provided
//       };
//       const res = await axios.put("/user/profile", updateData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200) {
//         setUser((prev) => ({ ...prev, name: data.name }));
//         toast.success("Profile updated successfully!");
//         reset({ name: data.name, password: "" }); // Reset form, keep updated name
//       }
//     } catch (error) {
//       console.error("Error updating profile", error);
//       toast.error("Failed to update profile.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         backgroundColor: "background.default",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           padding: "20px 40px",
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ fontWeight: 600, color: "text.primary" }}
//         >
//           Budget Buddy
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <IconButton onClick={toggleTheme} sx={{ color: "text.secondary" }}>
//             {themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
//           </IconButton>
//           <Button
//             variant="outlined"
//             startIcon={<LogoutIcon />}
//             sx={{
//               borderColor: "primary.main",
//               color: "primary.main",
//               fontWeight: 600,
//               textTransform: "none",
//               "&:hover": { borderColor: "primary.dark", color: "primary.dark" },
//             }}
//             onClick={handleLogout}
//           >
//             Log Out
//           </Button>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Container maxWidth="sm" sx={{ flexGrow: 1, py: 6 }}>
//         <Paper
//           elevation={2}
//           sx={{
//             padding: 4,
//             borderRadius: "12px",
//             border: "1px solid",
//             borderColor: "divider",
//             backgroundColor: "background.paper",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: 700, color: "text.primary", mb: 2, textAlign: "center" }}
//           >
//             Your Profile
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
//           >
//             Manage your account details
//           </Typography>

//           {/* Profile Info */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               Email: {user.email}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               Member since: {user.createdAt}
//             </Typography>
//           </Box>

//           {/* Edit Form */}
//           <Box
//             component="form"
//             onSubmit={handleSubmit(submitHandler)}
//             sx={{ display: "flex", flexDirection: "column", gap: 3 }}
//           >
//             <TextField
//               {...register("name", { required: true })}
//               label="Full Name"
//               variant="outlined"
//               fullWidth
//               defaultValue={user.name}
//               sx={{
//                 "& .MuiInputBase-root": { borderRadius: "6px" },
//                 "& .MuiInputBase-input": { color: "text.primary" },
//                 "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
//                 "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
//                 "& .MuiInputLabel-root": { color: "text.secondary" },
//                 "& .Mui-focused .MuiInputLabel-root": { color: "primary.main" },
//                 "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
//               }}
//             />
//             <TextField
//               {...register("password")}
//               label="New Password (optional)"
//               type={showPassword ? "text" : "password"}
//               variant="outlined"
//               fullWidth
//               sx={{
//                 "& .MuiInputBase-root": { borderRadius: "6px" },
//                 "& .MuiInputBase-input": { color: "text.primary" },
//                 "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
//                 "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
//                 "& .MuiInputLabel-root": { color: "text.secondary" },
//                 "& .Mui-focused .MuiInputLabel-root": { color: "primary.main" },
//                 "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={togglePasswordVisibility} sx={{ color: "text.secondary" }}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: "primary.main",
//                 color: "#FFFFFF",
//                 fontWeight: 600,
//                 textTransform: "none",
//                 borderRadius: "6px",
//                 padding: "10px 0",
//                 "&:hover": { backgroundColor: "primary.dark" },
//               }}
//             >
//               Update Profile
//             </Button>
//           </Box>
//         </Paper>
//       </Container>

//       {/* Footer */}
//       <Box
//         sx={{
//           padding: "20px 40px",
//           borderTop: "1px solid",
//           borderColor: "divider",
//           textAlign: "center",
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           © 2025 Budget Buddy. All rights reserved.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default UserProfile;

const drawerWidth = 240

const UserProfile = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Budgets", icon: <MonetizationOnIcon />, path: "/budgets" },
    { text: "Transactions", icon: <ReceiptLongIcon />, path: "/transactions"}
  ]

  const drawer = (
    <Box sx={{ width: drawerWidth, backgroundColor: "#2c3e50", height: "100vh", color: "#ecf0f1", paddingTop: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}>
        
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)} sx={{ "&:hover": { backgroundColor: "#34495e" } }}>
              <ListItemIcon sx={{ color: "#ecf0f1" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#10B981", width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Budget Buddy 
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
  variant="permanent"
  sx={{
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      overflow: "hidden",  // 🔥 Removes scrollbar
      height: "100vh",     // 🔥 Ensures full height
    },
  }}
  open
>
  {drawer}
</Drawer>


        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default UserProfile


import { useState } from "react";  
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, IconButton, Drawer, 
  List, ListItem, ListItemText, Box, Button
} from "@mui/material";
// import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { name: "McDonald's", amount: -24.99, category: "Food" },
    { name: "Car Loan", amount: -400, category: "Loan" },
    { name: "Salary", amount: +2500, category: "Income" },
  ]);


  
  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Pie Chart Data
  const categories = transactions.reduce((acc, txn) => {
    if (!acc[txn.category]) acc[txn.category] = 0;
    acc[txn.category] += txn.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categories).map(([key, value]) => ({
    name: key,
    value: Math.abs(value),
  }));

  const COLORS = ["#1E2A44", "#D4A017", "#2E7D32", "#4A5568", "#A0AEC0"]; 

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", backgroundColor: "#F8F1E9", color: "#1E2A44", padding: 4}}>

      {/* Header */}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, padding: "10px 20px" }}>
        
          {/* <ReorderIcon fontSize="large" /> */}
        

        <Typography variant="h4" sx={{ fontFamily: "'Lora', serif", flexGrow: 1, textAlign: "center", color: "#1E2A44" }}>
          Budget Buddy
        </Typography>

        <Button variant="outlined" sx={{ borderColor: "#D4A017", color: "#D4A017", "&:hover": { backgroundColor: "#D4A017", color: "#F8F1E9" } }} startIcon={<LogoutIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Sidebar */}

      <Drawer>
        <Box sx={{ width: 220, backgroundColor: "#1E2A44", height: "100vh", color: "#F8F1E9", padding: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "'Lora', serif', paddingBottom: 2, color: '#D4A017'" }}>
            Budget Buddy
          </Typography>

          <List>
            {["Dashboard", "Budgets", "Transactions"].map((text) => (
              <ListItem button key={text} onClick={() => navigate(`/${text.toLowerCase()}`)} sx={{ "&:hover": { backgroundColor: "#2E3B55" }, borderRadius: "8px" }}>
                <ListItemText primary={text} primaryTypographyProps={{ fontFamily: "'Montserrat', sans-serif" }} />
              </ListItem>))}
          </List>
        </Box>
      </Drawer>

      {/* Financial Overview */}

      <Grid container spacing={3}>
        {[
          { title: "Income", value: transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: "#2E7D32" },
          { title: "Expenses", value: Math.abs(transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0)).toFixed(2), color: "#D4A017" },
          { title: "Balance", value: transactions.reduce((sum, txn) => sum + txn.amount, 0).toFixed(2), color: transactions.reduce((sum, txn) => sum + txn.amount, 0) >= 0 ? "#2E7D32" : "#D4A017" },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "transform 0.2s ease-in-out", "&:hover": { transform: "translateY(-5px)" }, padding: 2 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", color: "#1E2A44" }}>
                  {item.title}
                </Typography>

                <Typography variant="h5" sx={{ color: item.color, fontFamily: "'Lora', serif" }}>
                  {item.value}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Transactions List */}

      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2, fontFamily: "'Lora', serif", color: "#1E2A44" }}>
        Recent Transactions
      </Typography>

      <Grid container spacing={3}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ backgroundColor: "#f04c5f", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", 
                alignItems: "center", 
                padding: 2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", color: "#1E2A44" }}>
                  {transaction.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: transaction.amount < 0 ? "#D4A017" : "#2E7D32", fontFamily: "'Lora', serif" }}
                >
                  {transaction.amount < 0 ? `-${Math.abs(transaction.amount).toFixed(2)}` : `+${transaction.amount.toFixed(2)}`}
                </Typography>
                <Typography variant="caption" sx={{ color: "#4A5568" }}>
                  {transaction.category}
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleDeleteTransaction(index)} sx={{ color: "#D4A017" }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Spending Chart */}
      <Typography 
        variant="h5" 
        sx={{ marginTop: 4, marginBottom: 2, fontFamily: "'Lora', serif", color: "#1E2A44" }}
      >
        Spending Breakdown
      </Typography>
      <Card 
        sx={{ 
          backgroundColor: "#FFFFFF", 
          borderRadius: "12px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
          padding: 4 
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1E2A44", 
                color: "#F8F1E9", 
                borderRadius: "8px", 
                fontFamily: "'Montserrat', sans-serif" 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default Dashboard;