import { ToolbarStyled } from '@/Layouts/AppHeader/AppHeader.styled';
import AuthButtons from '@/Layouts/AppHeader/AuthButtons/AuthButtons';
import MobileMenu from '@/Layouts/AppHeader/MobileMenu/MobileMenu';
import NavLinks from '@/Layouts/AppHeader/NavLinks/NavLinks';
import UserMenu from '@/Layouts/AppHeader/UserMenu/UserMenu';
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';
import { usePage } from '@inertiajs/react';
import { GitHub } from '@mui/icons-material';
import { AppBar, Box, Container } from '@mui/material';
import CartCounter, { type CartItem } from './CartCounter/CartCounter';

export default function AppHeader() {
  const { auth } = usePage().props;

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)'
      }}
    >
      <Container maxWidth='lg'>
        <ToolbarStyled variant='dense' disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <GitHub />
            <CartCounter items={(usePage().props.cart as CartItem[]) ?? []} />
            <NavLinks />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {auth.user ? <UserMenu user={auth.user} /> : <AuthButtons />}
            <ColorModeIconDropdown />
          </Box>
          <MobileMenu user={auth.user} />
        </ToolbarStyled>
      </Container>
    </AppBar>
  );
}
