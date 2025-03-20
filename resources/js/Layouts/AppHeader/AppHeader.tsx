import { ToolbarStyled } from '@/Layouts/AppHeader/AppHeader.styled';
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';
import { Link, usePage } from '@inertiajs/react';
import { GitHub } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import CartCounter, { type CartItem } from './CartCounter/CartCounter';

export default function AppHeader() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant='text' color='info' size='small'>
                Features
              </Button>
              <Button variant='text' color='info' size='small'>
                Testimonials
              </Button>
              <Button variant='text' color='info' size='small'>
                Highlights
              </Button>
              <Button variant='text' color='info' size='small'>
                Pricing
              </Button>
              <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center'
            }}
          >
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
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size='medium' />
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='top'
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  sx: {
                    top: 'var(--template-frame-height, 0px)'
                  }
                }
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Link style={{ width: '100%' }} href={route('register')}>
                    <Button color='primary' variant='contained' fullWidth>
                      Sign up
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link style={{ width: '100%' }} href={route('login')}>
                    <Button color='primary' variant='outlined' fullWidth>
                      Sign in
                    </Button>
                  </Link>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </ToolbarStyled>
      </Container>
    </AppBar>
  );
}
