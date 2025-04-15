import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authAPI } from "../utils/api";
import { toast } from "react-toastify";
import "../../assets/css/login.css";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Submitting signup data:", data);
      const response = await authAPI.signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("Signup response:", response);

      if (response.data) {
        toast.success("Signup Successful! Please log in.");
        navigate("/login");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-card">
        <Box className="login-header">
          <img src="/logo.png" alt="Budget Buddy Logo" className="login-logo" />
          <Typography variant="h4" className="login-title">
            Create Account
          </Typography>
          <Typography variant="body1" className="login-subtitle">
            Sign up to start managing your finances
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(submitHandler)} className="login-form">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box className="form-group">
            <TextField
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              label="Full Name"
              variant="outlined"
              fullWidth
              disabled={loading}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>

          <Box className="form-group">
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              disabled={loading}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box className="form-group">
            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              disabled={loading}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className="form-group">
            <TextField
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              disabled={loading}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              "Sign Up"
            )}
          </Button>
        </form>

        <Box className="login-footer">
          <Typography variant="body2">
            Already have an account? <Link to="/login">Sign in here</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
