import { LoginCardStyled, LoginWrapperStyled } from '@/Pages/Auth/Login/Login.styled';
import { Head, Link, useForm } from '@inertiajs/react';
import { GitHub } from '@mui/icons-material';
import { Link as MUILink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FormEventHandler } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation')
    });
  };

  return (
    <LoginWrapperStyled direction='column' justifyContent='space-between'>
      <Head title='Register' />
      <LoginCardStyled variant='outlined'>
        <GitHub />
        <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Create account
        </Typography>
        <Box
          component='form'
          onSubmit={submit}
          noValidate
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          gap={2}
        >
          <FormControl>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <TextField
              placeholder='John Doe'
              autoFocus
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              id='name'
              name='name'
              value={data.name}
              variant='outlined'
              onChange={(e) => setData('name', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <TextField
              placeholder='your@email.com'
              required
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              id='email'
              type='email'
              name='email'
              value={data.email}
              autoComplete='email'
              variant='outlined'
              onChange={(e) => setData('email', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <TextField
              error={!!errors.password}
              helperText={errors.password}
              name='password'
              placeholder='••••••'
              type='password'
              id='password'
              required
              fullWidth
              variant='outlined'
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='password_confirmation'>Confirm Password</FormLabel>
            <TextField
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation}
              name='password_confirmation'
              placeholder='••••••'
              type='password'
              id='password_confirmation'
              required
              fullWidth
              variant='outlined'
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
          </FormControl>

          <Button type='submit' fullWidth variant='contained' disabled={processing}>
            Register
          </Button>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <MUILink variant='body2' sx={{ alignSelf: 'center' }}>
              <Link as='span' href={route('login')}>
                Sign in
              </Link>
            </MUILink>
          </Typography>
        </Box>
      </LoginCardStyled>
    </LoginWrapperStyled>
  );
}
