import { useState } from 'react';
import useGoals from '../hooks/useGoals';
import useAccounts from '../hooks/useAccounts';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Goals = () => {
  const { goals, loading: goalLoading, error: goalError, refetch: refetchGoal } = useGoals();
  const { accounts, loading: accLoading, error: accError } = useAccounts();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [accountId, setAccountId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/goal', { name, targetAmount: parseFloat(targetAmount), accountId });
      refetchGoal();
      setName('');
      setTargetAmount('');
      setAccountId('');
      toast.success('Goal added');
    } catch (err) {
      console.error('Failed to create goal', err);
      toast.error('Failed to create goal');
    }
  };

  if (goalLoading || accLoading) return <Typography>Loading...</Typography>;
  if (goalError || accError) return <Typography color="error">Error loading data</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
        Goals
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Add New Goal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Goal Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            label="Target Amount"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
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
          <FormControl fullWidth>
            <InputLabel sx={{ color: 'text.secondary' }}>Account</InputLabel>
            <Select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              sx={{
                '& .MuiInputBase-input': { color: 'text.primary' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              }}
            >
              <MenuItem value="">Select Account</MenuItem>
              {accounts.map((a) => (
                <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: 'primary.main', color: '#FFFFFF', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Add Goal
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Target Amount</TableCell>
              <TableCell>Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell>{goal.name}</TableCell>
                <TableCell>${goal.targetAmount.toFixed(2)}</TableCell>
                <TableCell>{accounts.find((a) => a._id === goal.accountId)?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Goals;