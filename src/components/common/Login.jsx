import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  GitHub,
} from "@mui/icons-material";
import { authAPI } from "../utils/api";
import { saveUserData } from "../utils/auth";
import { toast } from "react-toastify";
import "../../assets/css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(formData);
      console.log("Login response:", response);

      if (response.data) {
        const { token, user } = response.data;

        if (!token || !user) {
          throw new Error("Invalid response format");
        }

        // Save user data and token
        const saved = saveUserData(user, token, user.role || "user");

        if (saved) {
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          throw new Error("Failed to save user data");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      window.location.href = `http://localhost:4000/api/auth/${provider}`;
    } catch (error) {
      console.error("Social login error", error);
      setError(`Error connecting to ${provider}`);
      toast.error(`Failed to connect to ${provider}`);
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-card">
        <Box className="login-header">
          <img src="/logo.png" alt="Budget Buddy Logo" className="login-logo" />
          <Typography variant="h4" className="login-title">
            Welcome Back
          </Typography>
          <Typography variant="body1" className="login-subtitle">
            Sign in to continue managing your finances
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box className="form-group">
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={loading}
              error={!!error}
            />
          </Box>

          <Box className="form-group">
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={loading}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            className="login-button"
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Box className="login-divider">
          <Typography variant="body2">Or continue with</Typography>
        </Box>

        <Box className="social-login">
          <IconButton
            onClick={() => handleSocialLogin("google")}
            className="social-button"
            disabled={loading}
          >
            <Google />
          </IconButton>
          <IconButton
            onClick={() => handleSocialLogin("facebook")}
            className="social-button"
            disabled={loading}
          >
            <Facebook />
          </IconButton>
          <IconButton
            onClick={() => handleSocialLogin("github")}
            className="social-button"
            disabled={loading}
          >
            <GitHub />
          </IconButton>
        </Box>

        <Box className="login-footer">
          <Typography variant="body2">
            Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
