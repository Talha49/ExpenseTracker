import React, { useState } from 'react';
import { deta } from '../../../../../utils/dbConfig';
import { Expenses } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Trash } from 'lucide-react';

const ExpenseListTable = ({ expenseInfo, refreshdata }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const deleteList = async (expense) => {
    try {
      const result = await deta.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        refreshdata();
        setSnackbarSeverity('success');
        setSnackbarMessage('Expense deleted successfully!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to delete expense. Please try again later.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='mt-3'>
    <div className='grid grid-cols-4  bg-slate-200 p-2'>
      <h2 className='font-bold text-primary '>Name</h2>
      <h2 className='font-bold text-primary '>Amount</h2>
      <h2 className='font-bold text-primary '>Date</h2>
      <h2 className='font-bold text-primary '>Action</h2>
    </div>

    {expenseInfo && expenseInfo.map((expense, index) => (
      <div key={index} className='grid grid-cols-4 bg-slate-200 p-2'>
        <h2 className=''>{expense.name}</h2>
        <h2 className=''>{expense.amount}</h2>
        <h2 className=']'>{expense.createdAt}</h2>
        <h2>
          <Trash className='text-red-600 ' onClick={() => deleteList(expense)} />
        </h2>
      </div>
      ))}
      
      {/* Snackbar for displaying messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
  
};

export default ExpenseListTable;
