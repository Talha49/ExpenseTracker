"use client"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateBudget = ({refreshData}) => {
  const [open, setOpen] = useState(false)
  const [emojiIcon, setEmojiIcon] = useState("😊")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const {user} = useUser()
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onCreateBudget = async () => {
    try {
      const result = await deta.insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress.emailAddress,
          icon: emojiIcon
        })
        .returning({ insertedId: Budgets.id });
  
      if (result) {
        refreshData();
        setSnackbarSeverity('success');
        setSnackbarMessage('Budget created successfully!');
        setSnackbarOpen(true);
        handleClose();
  
        // Clear input fields after successful creation
        setName('');
        setAmount('');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create budget. Please try again later.');
      setSnackbarOpen(true);
    }
  };
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md' onClick={handleClickOpen}>
          <h2 className='text-3xl'>+</h2>
          <h2>Create New Budget</h2>
        </div>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>Create The Budget!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className=''>
              <button onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                {emojiIcon}
              </button>

              <div className=''>
                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji)
                  setOpenEmojiPicker(false)
                }} />
              </div>
              <div className='mt-2'>
                <h2>Budget Name</h2>
                <Input type="text" onChange={(e) => setName(e.target.value)} placeholder='e.g House Grocery' />
              </div>
              <div className='mt-2'>
                <h2>Budget Amount</h2>
                <Input type="number" onChange={(e) => setAmount(e.target.value)} placeholder='e.g 5000$' />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onCreateBudget} disabled={!(name && amount)} color='secondary' size='small' variant='contained' className='mt-4'>Create Budget</Button>
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

export default CreateBudget;
