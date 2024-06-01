
"use client"
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { PenBox } from 'lucide-react'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@mui/material';
import { deta } from '../../../../../utils/dbConfig';
import { Budgets } from '../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { eq } from 'drizzle-orm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateBudget = ({ budget, refreshData }) => {
  const [open, setOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


 useEffect(() =>{
 
  if(budget){
    setEmojiIcon(budget?.icon);
    setName(budget?.name);
    setAmount(budget?.amount);
  }
 },[budget])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onUpdateBudget = async () => {
    try {
      const result = await deta.update(Budgets).set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      }).where(eq(Budgets.id, budget.id))
      .returning()

      if (result) {
        refreshData();
        setSnackbarSeverity('success');
        setSnackbarMessage('Budget updated successfully!');
        setSnackbarOpen(true); 
        handleClose();
      }
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to update budget. Please try again later.');
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className='flex gap-2'>
        <PenBox /> Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <button onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </button>

              <div>
                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji)
                  setOpenEmojiPicker(false)
                }} />
              </div>
              <div className='mt-2'>
                <h2>Budget Name</h2>
                <Input type="text" defaultValue={budget?.name} onChange={(e) => setName(e.target.value)} placeholder='e.g House Grocery' />
              </div>
              <div className='mt-2'>
                <h2>Budget Amount</h2>
                <Input type="number" defaultValue={budget?.amount} onChange={(e) => setAmount(e.target.value)} placeholder='e.g 5000$' />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onUpdateBudget} disabled={!(name && amount)} color='secondary' size='small' variant='contained' className='mt-4'>Update Budget</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default UpdateBudget;
