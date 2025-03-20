import { router, usePage } from '@inertiajs/react';
import { Alert, Button } from '@mui/material';
import { useState } from 'react';

export default function EmailVerificationAlert() {
  const { auth } = usePage().props;
  const [sending, setSending] = useState(false);

  if (!auth.user || auth.user.email_verified_at) {
    return null;
  }

  const resend = () => {
    setSending(true);
    router.post(
      route('verification.send'),
      {},
      {
        onFinish: () => setSending(false)
      }
    );
  };

  return (
    <Alert
      severity='warning'
      action={
        <Button color='inherit' size='small' onClick={resend} disabled={sending}>
          {sending ? 'Sending...' : 'Resend Verification Email'}
        </Button>
      }
      sx={{ borderRadius: 0 }}
    >
      Please verify your email address.
    </Alert>
  );
}
