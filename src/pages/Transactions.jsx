import { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import useAccounts from '../hooks/useAccounts';
import useCategories from '../hooks/useCategories';
import api from '../services/api';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Transactions = () => {
  const { transactions, loading: transLoading, error: transError, refetch: refetchTrans } = useTransactions();
  const { accounts, loading: accLoading, error: accError } = useAccounts();
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { type, amount: parseFloat(amount), description };
      if (type === 'income') {
        data.toAccountId = toAccountId;
        data.categoryId = categoryId;
      } else if (type === 'expense') {
        data.fromAccountId = fromAccountId;
        data.categoryId = categoryId;
      } else if (type === 'transfer') {
        data.fromAccountId = fromAccountId;
        data.toAccountId = toAccountId;
      }
      await api.post('/transaction', data);
      refetchTrans();
      setAmount('');
      setDescription('');
      setCategoryId('');
      setFromAccountId('');
      setToAccountId('');
    } catch (err) {
      console.error('Failed to create transaction', err);
      alert('Failed to create transaction');
    }
  };

  if (transLoading || accLoading || catLoading) return <div>Loading...</div>;
  if (transError || accError || catError) return <div>Error loading data</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Transactions</Typography>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h6">Add New Transaction</Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="transfer">Transfer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {type !== 'transfer' && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.filter(c => c.type === type).map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(type === 'expense' || type === 'transfer') && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>From Account</InputLabel>
              <Select value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                {accounts.map(a => (
                  <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(type === 'income' || type === 'transfer') && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>To Account</InputLabel>
              <Select value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
                {accounts.map(a => (
                  <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Transaction
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>From Account</TableCell>
              <TableCell>To Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>${t.amount.toFixed(2)}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.categoryId ? categories.find(c => c._id === t.categoryId)?.name : '-'}</TableCell>
                <TableCell>{t.fromAccountId ? accounts.find(a => a._id === t.fromAccountId)?.name : '-'}</TableCell>
                <TableCell>{t.toAccountId ? accounts.find(a => a._id === t.toAccountId)?.name : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Transactions;