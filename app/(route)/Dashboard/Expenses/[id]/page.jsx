"use client"
import React, { useEffect, useState } from 'react';
import { deta } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import BudgetItems from '../../Budget/_components/BudgetItems';
import AddExpense from '../../Expenses/_components/AddExpense';
import ExpenseListTable from '../../Expenses/_components/ExpenseListTable';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar,styled } from '@mui/material';
import EditButtonBudget from '../../Expenses/_components/EditButtonBudget'
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Styled Button component with custom background
const CoolBackgroundButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4CAF50 30%, #388E3C 90%)', // Green gradient
  color: theme.palette.primary.contrastText, // Set text color for contrast
  textTransform: 'capitalize', // Capitalize only the first letter
  '&:hover': {
    background: 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)', // Darken the gradient on hover
  },
}));

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const router = useRouter()
  const [expense, setExpense] = useState();
  const [expenseInfo, setExpenseInfo] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for dialog open/close
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open/close

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await deta.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number),
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setExpense(result[0]);
    ExpenseInfo();
  };

  const ExpenseInfo = async () => {
    const result = await deta.select().from(Expenses).where(eq(Expenses.budgetId, params.id)).orderBy(desc(Expenses.id));
    setExpenseInfo(result);
  };

  const handleDeleteButtonClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    setOpenDeleteDialog(false);
    const deleteExpenseFirst = await deta.delete(Expenses).where(eq(Expenses.budgetId,params.id));
    
    if(deleteExpenseFirst){
      const result = await deta.delete(Budgets).where(eq(Budgets.id,params.id)).returning();
      if(result) {
        setSnackbarOpen(true); // Open Snackbar on successful deletion
        router.push('/Dashboard/Budget')
      }
    }
  };

  const handleDeleteCanceled = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='p-10'>
      <div className='md:flex md:justify-between   items-center'>
        <h2 className='md:text-2xl font-bold text-sm'>My Expenses</h2>
       <div className='flex gap-2 items-center mt-2'>
       <CoolBackgroundButton className='flex   items-center ' onClick={handleDeleteButtonClick}>
          <Trash className='text-green-800 mr-2 ' /><span>Delete</span>
        </CoolBackgroundButton>
        <EditButtonBudget budget ={expense} refreshData={() => getBudgetInfo()}/>
       </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
        {expense ? <BudgetItems budgets={expense} /> :
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
        }
        <AddExpense paramsId={params.id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expense List</h2>
        <ExpenseListTable expenseInfo={expenseInfo} refreshdata={() => getBudgetInfo()} />
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCanceled}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this budget along with your Expense Details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCanceled} color='primary'>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color='primary' >Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for deletion confirmation */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Budget deleted successfully!"
      />
    </div>
  );
};

export default ExpensesScreen;
