// import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
  Rating,
  AppBar,
} from '@mui/material';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const [themeMode, setThemeMode] = useState("light");
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? "#0B0F19" : "#fff", color: themeMode === "dark" ? "#fff" : "#000" }}>
      <Box sx={{ backgroundColor: themeMode === "dark" ? "#0B0F19" : "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />
    <Box sx={{ minHeight: '100vh',  }}>
      {/* Header Section */}
      {/* <Box sx={{ backgroundColor: '#333', color: 'white', padding: '1em', textAlign: 'center' }}>
        <Typography variant="h5">Budget Buddy</Typography>
        <Link to="/features" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
          Features
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
          About
        </Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
          Login/Register
        </Link>
      </Box> */}

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ padding: '2em', textAlign: 'center' }}>
        <Typography variant="h2" sx={{ marginBottom: '1em' }}>
          Your Financial Companion
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Get Started
        </Button>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ padding: '2em' }}>
        <Typography variant="h3" sx={{ marginBottom: '1em' }}>
          Key Features of Budget Buddy
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="expense-tracking.jpg"
                alt="Expense Tracking"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Expense Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easily track your daily expenses.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="budget-planning.jpg"
                alt="Budget Planning"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Budget Planning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plan your budget with ease.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="financial-insights.jpg"
                alt="Financial Insights"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Financial Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get detailed insights into your spending habits.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ padding: '2em' }}>
        <Typography variant="h3" sx={{ marginBottom: '1em' }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '1em' }}>
              <Avatar sx={{ width: 56, height: 56, margin: '0 auto' }}>
                User1
              </Avatar>
              <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
                Great app! Helps me manage my finances effectively.
              </Typography>
              <Rating name="read-only" value={5} readOnly />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: '1em' }}>
              <Avatar sx={{ width: 56, height: 56, margin: '0 auto' }}>
                User2
              </Avatar>
              <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>
                Easy to use and very intuitive.
              </Typography>
              <Rating name="read-only" value={5} readOnly />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call-to-Action Section */}
      <Container maxWidth="lg" sx={{ padding: '2em', textAlign: 'center' }}>
        <Button variant="contained" size="large" color="primary">
          Start Using Budget Buddy Today!
        </Button>
        <Typography variant="body1" sx={{ marginTop: '1em' }}>
          Take control of your finances with our easy-to-use app.
        </Typography>
      </Container>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#333', color: 'white', padding: '1em', textAlign: 'center' }}>
        <Typography variant="body1">
          Contact Us: <a href="mailto:info@budgetbuddy.com" style={{ color: 'white' }}>
            info@budgetbuddy.com
          </a>
        </Typography>
        <Typography variant="body1">
          Follow us on{' '}
          <a href="#" style={{ color: 'white' }}>
            Facebook
          </a>{' '}
          and{' '}
          <a href="#" style={{ color: 'white' }}>
            Twitter
          </a>
          .
        </Typography>
        <Typography variant="body1">&copy; 2025 Budget Buddy. All rights reserved.</Typography>
      </Box>
    </Box>
    </Box>
    </AppBar>

  );
}

export default Home;
