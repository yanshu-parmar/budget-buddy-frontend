import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      if (res.status === 200) {
        toast.success("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error", error.response?.data);
      toast.error("Invalid credentials. Please try again.");
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
        backgroundColor: "#FFFFFF", // Clean white background
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
        {/* Branding */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: "#2D3748", // Dark slate
            mb: 1,
          }}
        >
          Log In
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#4A5568", // Gray
            mb: 3,
          }}
        >
          Log in to manage your finances
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
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
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3182CE" },
              "& .MuiInputLabel-root": { color: "#4A5568" },
              "& .Mui-focused .MuiInputLabel-root": { color: "#3182CE" },
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
            onClick={() => navigate("/landingpage")}
          >
            Log In
          </Button>
          <Typography
            variant="body2"
            sx={{ color: "#4A5568", fontFamily: "'Montserrat', sans-serif", mt: 2 }}
          >
            Don’t have an account?{" "}
            <span
              style={{
                color: "#3182CE",
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;