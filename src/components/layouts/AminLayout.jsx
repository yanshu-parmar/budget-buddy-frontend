import { Outlet, useNavigate } from "react-router-dom";
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Budgets", icon: <MonetizationOnIcon />, path: "/budgets" },
    { text: "Transactions", icon: <ReceiptLongIcon />, path: "/transactions" },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth, backgroundColor: "#2c3e50", height: "100vh", color: "#ecf0f1", paddingTop: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}>
        Admin Panel
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
  );

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
            Budget Buddy Admin
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
  );
};

export default AdminLayout;