import EmailVerificationAlert from '@/Components/EmailVerificationAlert/EmailVerificationAlert';
import AppHeader from '@/Layouts/AppHeader/AppHeader';
import Footer from '@/Layouts/Footer/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <Box>
      <AppHeader />
      <Container maxWidth='lg' component='main' sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
        <EmailVerificationAlert />
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
