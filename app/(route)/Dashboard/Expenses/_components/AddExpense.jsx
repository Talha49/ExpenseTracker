"use client"
import { Button, Input, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { deta } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import moment from 'moment';

const AddExpense = ({ paramsId, user,refreshData }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const addNewExpense = async () => {
    try {
      await deta.insert(Expenses).values({
        name: name,
        amount: amount,
        budgetId: paramsId,
        createdAt: moment().format("DD/MM/yyy")
      }).execute();

      // Display success message
      setSnackbarMessage('Expense added successfully');
      setSnackbarOpen(true);

      // Clear input fields after successful addition
      setName('');
      setAmount('');
      refreshData()
    } catch (error) {
      // Display error message
      setSnackbarMessage('Error occurred while adding expense');
      setSnackbarOpen(true);
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='text-lg font-bold'>Add Expense</h2>
     
      <div className='p-5'>
      <div className='mt-2'>
        <h2>Expense Name</h2>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g Bedroom Decor' />
      </div>
      <div className='mt-2 '>
        <h2>Expense Amount</h2>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='e.g 2000$' />
      </div>
      </div>
      <Button onClick={() => addNewExpense()} disabled={!(name && amount)} color='secondary' size='small' variant='contained' className=''>Add New Expense</Button>

      {/* Snackbar for displaying messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </div>
  );
};

export default AddExpense;
