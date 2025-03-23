import ForgotPassword from '@/Pages/Auth/Login/ForgotPassword/ForgotPassword';
import { LoginCardStyled, LoginWrapperStyled } from '@/Pages/Auth/Login/Login.styled';
import { Head, Link, useForm } from '@inertiajs/react';
import { GitHub } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as MUILink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type FormEventHandler, useState } from 'react';

export default function Login() {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password')
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LoginWrapperStyled direction='column' justifyContent='space-between'>
      <Head title='Login' />
      <ForgotPassword open={open} handleClose={handleClose} />
      <LoginCardStyled variant='outlined'>
        <GitHub />
        <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Sign in
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
            <FormLabel htmlFor='email'>Email</FormLabel>
            <TextField
              placeholder='your@email.com'
              autoFocus
              required
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              color={errors.email ? 'error' : 'primary'}
              id='email'
              type='email'
              name='email'
              value={data.email}
              autoComplete='email'
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
              autoComplete='current-password'
              autoFocus
              required
              fullWidth
              color={errors.password ? 'error' : 'primary'}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            name='remember'
            checked={data.remember}
            onChange={(e) => setData('remember', (e.target as HTMLInputElement).checked)}
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' onClick={submit}>
            Sign in
          </Button>
          <MUILink
            component='button'
            type='button'
            onClick={handleClickOpen}
            variant='body2'
            sx={{ alignSelf: 'center' }}
          >
            Forgot your password?
          </MUILink>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button fullWidth variant='outlined' onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <MUILink variant='body2' sx={{ alignSelf: 'center' }}>
              <Link as='span' href={route('register')}>
                Sign up
              </Link>
            </MUILink>
          </Typography>
        </Box>
      </LoginCardStyled>
    </LoginWrapperStyled>
  );
}
