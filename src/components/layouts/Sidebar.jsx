import { Drawer, List, ListItem, ListItemText, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", backgroundColor: "#121212", color: "#fff" } }}
    >
      <Toolbar />
      <Box sx={{ padding: 2, textAlign: "center", borderBottom: "1px solid gray" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#10B981" }}>
          Budget Buddy
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/transactions">
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem button component={Link} to="/budgets">
          <ListItemText primary="Budgets" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;