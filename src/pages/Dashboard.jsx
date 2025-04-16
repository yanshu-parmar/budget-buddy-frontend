import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useTransactions from '../hooks/useTransactions';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { transactions, loading, error } = useTransactions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user.name}</Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Financial Summary</Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography>Total Income: ${totalIncome.toFixed(2)}</Typography>
          <Typography>Total Expenses: ${totalExpenses.toFixed(2)}</Typography>
          <Typography>Net Balance: ${netBalance.toFixed(2)}</Typography>
        </Paper>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Recent Transactions</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>${t.amount.toFixed(2)}</TableCell>
                  <TableCell>{t.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;