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
<div className='mt-3 shadow-lg overflow-x-auto'>
  <table className='min-w-full divide-y divide-gray-200'>
    <thead className='bg-slate-200'>
      <tr>
        <th className='font-bold text-primary p-2'>Name</th>
        <th className='font-bold text-primary p-2'>Amount</th>
        <th className='font-bold text-primary p-2'>Date</th>
        <th className='font-bold text-primary p-2'>Action</th>
      </tr>
    </thead>
    <tbody className='bg-white divide-y divide-gray-200'>
      {expenseInfo && expenseInfo.map((expense, index) => (
        <tr key={index} className='bg-slate-200'>
          <td className='p-2'>{expense.name}</td>
          <td className='p-2'>{expense.amount}</td>
          <td className='p-2'>{expense.createdAt}</td>
          <td className='p-2'>
            <Trash className='text-red-600 ' onClick={() => deleteList(expense)} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
  <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </MuiAlert>
</Snackbar>
</div>



  );
  
};

export default ExpenseListTable;
