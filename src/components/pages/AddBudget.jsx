// import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, MenuItem, Grid, Card, CardContent, Typography } from "@mui/material";

export const AddBudget = ({ onBudgetAdded }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.userId = localStorage.getItem("id"); // Associate budget with user
    try {
      const response = await axios.post("/budget/add", data);
      console.log("Budget Added:", response.data);

      onBudgetAdded(response.data.budget); // Notify parent about the new budget
      reset();
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return (
    <Card sx={{ mt: 3, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Budget
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Budget Name" {...register("budgetName")} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Amount" {...register("amount")} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Category" {...register("category")} required>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Start Date" {...register("startDate")} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="End Date" {...register("endDate")} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Budget
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};


export default AddBudget