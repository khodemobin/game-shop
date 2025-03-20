import { Link, router } from '@inertiajs/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Divider, Drawer, IconButton, MenuItem } from '@mui/material';
import { useState } from 'react';
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';

interface MobileMenuProps {
  user: {
    name: string;
  } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          {user ? (
            <>
              <MenuItem>
                <Link style={{ width: '100%' }} href={route('profile.edit')}>
                  <Button color='primary' variant='contained' fullWidth>
                    Profile
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Button onClick={handleLogout} color='primary' variant='outlined' fullWidth>
                  Logout
                </Button>
              </MenuItem>
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
