import { useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: ''
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(route('password.email'), {
      onSuccess: () => {
        setIsEmailSent(true);
      }
    });
  };

  const handleDialogClose = () => {
    setIsEmailSent(false);
    reset('email');
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: submit,
          sx: { backgroundImage: 'none' }
        }
      }}
    >
      <DialogTitle>{isEmailSent ? 'Check your email' : 'Reset password'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {isEmailSent ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleOutlineIcon color='success' sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant='body1' gutterBottom>
              We've sent a password reset link to:
            </Typography>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
              {data.email}
            </Typography>
            <DialogContentText>Please check your email and click on the link to reset your password.</DialogContentText>
          </Box>
        ) : (
          <>
            <DialogContentText>
              Enter your account's email address, and we'll send you a link to reset your password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin='dense'
              id='email'
              name='email'
              placeholder='Email address'
              type='email'
              fullWidth
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
            />
            {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleDialogClose}>{isEmailSent ? 'Close' : 'Cancel'}</Button>
        {!isEmailSent && (
          <Button variant='contained' type='submit' disabled={processing}>
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
