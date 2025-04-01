import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/user/signup", data);
      if (res.status === 201) {
        toast.success("Signup Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error", error.response?.data);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFFFF",
      }}
    >
      <Paper
        elevation={3} // Subtle elevation for professionalism
        sx={{
          padding: 4,
          borderRadius: "12px",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0", // Light gray border
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: "#2D3748", // Dark slate
            mb: 1,
          }}
        >
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            {...register("name", { required: true })}
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-root": { borderRadius: "6px" },
              "& .MuiInputBase-input": { color: "#2D3748", fontFamily: "'Montserrat', sans-serif" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" }, // Light gray border
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" }, // Blue on hover
              "& .MuiInputLabel-root": { color: "#4A5568" },
              "& .Mui-focused .MuiInputLabel-root": { color: "#3182CE" }, // Blue when focused
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" },
            }}
          />
          <TextField
            {...register("email", { required: true })}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-root": { borderRadius: "6px" },
              "& .MuiInputBase-input": { color: "#2D3748", fontFamily: "'Montserrat', sans-serif" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" }, // Light gray border
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" }, // Blue on hover
              "& .MuiInputLabel-root": { color: "#4A5568" },
              "& .Mui-focused .MuiInputLabel-root": { color: "#3182CE" }, // Blue when focused
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" },
            }}
          />
          <TextField
            {...register("password", { required: true })}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-root": { borderRadius: "6px" },
              "& .MuiInputBase-input": { color: "#2D3748", fontFamily: "'Montserrat', sans-serif" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" }, // Light gray border
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" }, // Blue on hover
              "& .MuiInputLabel-root": { color: "#4A5568" },
              "& .Mui-focused .MuiInputLabel-root": { color: "#3182CE" }, // Blue when focused
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} sx={{ color: "#4A5568" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register("confirmPassword", { required: true })}
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-root": { borderRadius: "6px" },
              "& .MuiInputBase-input": { color: "#2D3748", fontFamily: "'Montserrat', sans-serif" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" }, // Light gray border
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" }, // Blue on hover
              "& .MuiInputLabel-root": { color: "#4A5568" },
              "& .Mui-focused .MuiInputLabel-root": { color: "#3182CE" }, // Blue when focused
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} sx={{ color: "#4A5568" }}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3182CE", // Professional blue
              color: "#FFFFFF",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              borderRadius: "6px",
              padding: "10px 0",
              textTransform: "none", // Avoid uppercase for a softer look
              "&:hover": {
                backgroundColor: "#2B6CB0", // Darker blue on hover
                transition: "background-color 0.3s ease",
              },
            }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            sx={{ color: "#4A5568", fontFamily: "'Montserrat', sans-serif", mt: 2 }}
          >
            Already have an account?{" "}
            <span
              style={{
                color: "#4A5568",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;