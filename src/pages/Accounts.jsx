import { useState } from 'react';
import useAccounts from '../hooks/useAccounts';
import api from '../services/api';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Accounts = () => {
  const { accounts, loading, error, refetch } = useAccounts();
  const [name, setName] = useState('');
  const [type, setType] = useState('other');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/account', { name, type });
      refetch();
      setName('');
      setType('other');
    } catch (err) {
      console.error('Failed to create account', err);
      alert('Failed to create account');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Accounts</Typography>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h6">Add New Account</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="checking">Checking</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="investment">Investment</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Account
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Accounts;