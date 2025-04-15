import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "expenseDate", headerName: "Date", width: 130 },
    { field: "expenseCategory", headerName: "Category", width: 150 },
    { field: "expenseDescription", headerName: "Description", width: 200 },
    { field: "expenseAmount", headerName: "Amount", width: 120 },
    { field: "expensePaymentMethod", headerName: "Payment Method", width: 150 },
    { field: "expenseStatus", headerName: "Status", width: 130 },
  ];

  const getAllExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses/getallexpenses");
      setExpenses(res.data.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        All Expenses
      </Typography>
      <DataGrid
        rows={expenses}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
      />
    </Box>
  );
};
