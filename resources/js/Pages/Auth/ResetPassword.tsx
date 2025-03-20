import { Head, useForm } from '@inertiajs/react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: ''
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('password.update'));
  };

  return (
    <>
      <Head title='Reset Password' />
      <Container maxWidth='sm' sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>
            Reset Password
          </Typography>
          <Box component='form' onSubmit={submit} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                id='email'
                type='email'
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                disabled
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel htmlFor='password'>New Password</FormLabel>
              <TextField
                id='password'
                type='password'
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel htmlFor='password_confirmation'>Confirm Password</FormLabel>
              <TextField
                id='password_confirmation'
                type='password'
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation}
                fullWidth
              />
            </FormControl>

            <Button type='submit' fullWidth variant='contained' disabled={processing}>
              Reset Password
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
