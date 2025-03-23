import EmailVerificationAlert from '@/Components/EmailVerificationAlert/EmailVerificationAlert';
import FlashMessage from '@/Components/FlashMessage/FlashMessage';
import AppHeader from '@/Layouts/AppHeader/AppHeader';
import Footer from '@/Layouts/Footer/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      <AppHeader />

      <Container maxWidth='lg' component='main'>
        <EmailVerificationAlert />
        <FlashMessage />
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, pt: 15 }}>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
}
