import { useForm } from '@inertiajs/react';
import { Box, Button, Divider, FormControl, FormLabel, Grid2, TextField, Typography } from '@mui/material';

export default function AccountSettings() {
  const { data, setData, post, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('profile.update'));
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        Account Settings
      </Typography>

      <Divider />
      <Grid2 mt={2} container spacing={2}>
        <FormControl fullWidth>
          <FormLabel htmlFor='current_password'>Current Password</FormLabel>
          <TextField
            error={!!errors.current_password}
            helperText={errors.current_password}
            name='current_password'
            type='password'
            required
            color={errors.current_password ? 'error' : 'primary'}
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor='password'>New Password</FormLabel>
          <TextField
            error={!!errors.password}
            helperText={errors.password}
            name='password'
            type='password'
            required
            color={errors.password ? 'error' : 'primary'}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor='password_confirmation'>Confirm New Password</FormLabel>
          <TextField
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
            name='password_confirmation'
            type='password'
            required
            color={errors.password_confirmation ? 'error' : 'primary'}
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />
        </FormControl>

        <Button sx={{ marginTop: 2 }} type='submit' variant='contained' onClick={handleSubmit}>
          Update Password
        </Button>
      </Grid2>
    </Box>
  );
}
