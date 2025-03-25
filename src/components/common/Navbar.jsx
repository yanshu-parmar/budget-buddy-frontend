import { AppBar, Toolbar, Typography, IconButton,  } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Navbar = ({ themeMode, toggleTheme }) => {

  return (
    <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? "#0B0F19" : "#fff", color: themeMode === "dark" ? "#fff" : "#000" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and App Name */}
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
          <span role="img" aria-label="budget"></span> Budget Buddy
        </Typography>

        

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} color="inherit">
          {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
