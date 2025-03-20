import { Link } from '@inertiajs/react';
import { Button } from '@mui/material';

export default function AuthButtons() {
  return (
    <>
      <Link href={route('login')}>
        <Button color='primary' variant='text' size='small'>
          Sign in
        </Button>
      </Link>
      <Link href={route('register')}>
        <Button color='primary' variant='contained' size='small'>
          Sign up
        </Button>
      </Link>
    </>
  );
}
