import { Link, router, usePage } from '@inertiajs/react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface UserMenuProps {
  user: {
    name: string;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { component } = usePage();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <>
      <IconButton
        onClick={handleMenu}
        size='small'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
      >
        <Avatar sx={{ width: 24, height: 24 }}>{user.name.charAt(0).toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={route('profile')} className={component.startsWith('Profile') ? 'active' : ''}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
