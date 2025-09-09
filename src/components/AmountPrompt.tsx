import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function AmountPrompt({ open, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError('');
    } else {
      setError('Please enter a valid number');
    }
  };

  const handleSubmit = () => {
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid number');
    } else {
      setError('');
      onSubmit(Number(amount));
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Amount</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Amount"
          value={amount}
          onChange={handleChange}
          helperText={error}
          error={!!error}
          type="number"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}