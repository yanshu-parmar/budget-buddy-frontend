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
      console.error("Signup error", error.response?.data)
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Box sx={{ 
      height: "100vh", 
      width: "100vw", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#fff" 
    }}>
      <Paper elevation={10} sx={{ 
        padding: 5, 
        borderRadius: 3, 
        width: "100%", 
        maxWidth: 400, 
        textAlign: "center", 
        backgroundColor: "#fff", 
        color: "#000" 
      }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00ADB5", mb: 3 }}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            {...register("name", { required: true })}
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#b0b0b0" }, fieldset: { borderColor: "#b0b0b0" } }}
          />
          <TextField
            {...register("email", { required: true })}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#b0b0b0" }, fieldset: { borderColor: "#b0b0b0" } }}
          />
          <TextField
            {...register("password", { required: true })}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#b0b0b0" }, fieldset: { borderColor: "#b0b0b0" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} sx={{ color: "#00ADB5" }}>
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
            sx={{ input: { color: "#fff" }, label: { color: "#b0b0b0" }, fieldset: { borderColor: "#b0b0b0" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} sx={{ color: "#00ADB5" }}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#00ADB5", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#008C9E" } }}>
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ color: "#b0b0b0", mt: 2 }}>
            Already have an account?{" "}
            <span 
              style={{ color: "#00ADB5", cursor: "pointer", fontWeight: "bold" }} 
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
