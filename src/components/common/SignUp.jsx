import { useForm } from "react-hook-form";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Signing up...", data);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#F3F4F6"
    >
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              {...register("name", { required: "Full Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ mt: 2, bgcolor: "#1E3A8A", "&:hover": { bgcolor: "#10B981" } }}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
