import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res.data);
      if (res.status === 200) {
        alert("Login Success");
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);
        
        if (res.data.data.roleId.name === "USER") {
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Login Error:", error); // Logs full error object
      alert("Login Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={10} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#10B981", color: "#fff", textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d3ba2c", marginBottom: 2 }}>
          LOGIN USER
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            {...register("name", { required: true })}
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#a2b2a7" }, fieldset: { borderColor: "#a2b2a7" } }}
          />
          <TextField
            {...register("email", { required: true })}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#a2b2a7" }, fieldset: { borderColor: "#a2b2a7" } }}
          />
          <TextField
            {...register("password", { required: true })}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ input: { color: "#fff" }, label: { color: "#a2b2a7" }, fieldset: { borderColor: "#a2b2a7" } }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#d3ba2c", color: "#000", fontWeight: "bold", '&:hover': { backgroundColor: "#178bab" } }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
