import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Budget Buddy
          </Typography>
          {user && (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate('/accounts')}>Accounts</Button>
              <Button color="inherit" onClick={() => navigate('/categories')}>Categories</Button>
              <Button color="inherit" onClick={() => navigate('/transactions')}>Transactions</Button>
              <Button color="inherit" onClick={() => navigate('/budgets')}>Budgets</Button>
              <Button color="inherit" onClick={() => navigate('/goals')}>Goals</Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;