import { useState } from 'react';
import useBudgets from '../hooks/useBudgets';
import useCategories from '../hooks/useCategories';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Budgets = () => {
  const { budgets, loading: budLoading, error: budError, refetch: refetchBud } = useBudgets();
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/budget', { categoryId, amount: parseFloat(amount), month });
      refetchBud();
      setCategoryId('');
      setAmount('');
      setMonth(new Date().toISOString().slice(0, 7));
      toast.success('Budget added');
    } catch (err) {
      console.error('Failed to create budget', err);
      toast.error('Failed to create budget');
    }
  };

  if (budLoading || catLoading) return <Typography>Loading...</Typography>;
  if (budError || catError) return <Typography color="error">Error loading data</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
        Budgets
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Add New Budget
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              sx={{
                '& .MuiInputBase-input': { color: 'text.primary' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              }}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.filter((c) => c.type === 'expense').map((c) => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            sx={{
              '& .MuiInputBase-input': { color: 'text.primary' },
              '& .MuiInputLabel-root': { color: 'text.secondary' },
              '& .Mui-focused .MuiInputLabel-root': { color: 'primary.main' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
            }}
          />
          <TextField
            label="Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            fullWidth
            sx={{
              '& .MuiInputBase-input': { color: 'text.primary' },
              '& .MuiInputLabel-root': { color: 'text.secondary' },
              '& .Mui-focused .MuiInputLabel-root': { color: 'primary.main' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: 'primary.main', color: '#FFFFFF', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Add Budget
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget._id}>
                <TableCell>{categories.find((c) => c._id === budget.categoryId)?.name}</TableCell>
                <TableCell>${budget.amount.toFixed(2)}</TableCell>
                <TableCell>{budget.month}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Budgets;