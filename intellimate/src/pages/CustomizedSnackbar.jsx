import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbar({open,onClose}) {
  return (
    <div className='snackbar'>
        <Snackbar open={open}  onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} sx={{ width: '50%' ,marginTop:"50px"}}>
        <Alert
          onClose={onClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Welcome to IntelliMate!
        </Alert>
      </Snackbar>
    </div>
  )
}
