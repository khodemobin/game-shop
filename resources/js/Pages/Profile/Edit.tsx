import { Head, Link, useForm } from '@inertiajs/react';
import { Box, Button, Container, FormControl, FormLabel, Paper, TextField, Typography } from '@mui/material';
import type { FormEventHandler } from 'react';

interface Props {
  mustVerifyEmail: boolean;
  status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
  const { data, setData, patch, errors, processing } = useForm({
    name: '',
    email: ''
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <>
      <Head title='Profile' />
      <Container maxWidth='md' sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>
            Profile Information
          </Typography>
          <Box component='form' onSubmit={submit} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <TextField
                id='name'
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            </FormControl>

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
              />
            </FormControl>

            {mustVerifyEmail && (
              <Typography color='warning.main' sx={{ mb: 2 }}>
                Your email address is unverified.
                <Link href={route('verification.send')}>Click here to re-send the verification email.</Link>
              </Typography>
            )}

            <Button type='submit' variant='contained' disabled={processing}>
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
