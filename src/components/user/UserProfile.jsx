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