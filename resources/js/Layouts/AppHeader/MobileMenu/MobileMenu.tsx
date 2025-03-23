import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, router, usePage } from '@inertiajs/react';
import { Box, Button, Divider, Drawer, IconButton, MenuItem } from '@mui/material';
import { useState } from 'react';

import type { MenuItemType } from '@/types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface MobileMenuProps {
  user: {
    name: string;
  } | null;
  menus?: MenuItemType[];
}

export default function MobileMenu({ user, menus }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);
  const { url, component } = usePage();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleSubMenu = (menuId: number) => {
    setOpenSubMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]));
  };

  const renderMenuItem = (menu: MenuItemType) => {
    if (menu?.children?.length) {
      const isSubMenuOpen = openSubMenus.includes(menu.id);
      return (
        <Box key={menu.id}>
          <MenuItem
            onClick={() => toggleSubMenu(menu.id)}
            sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}
          >
            {menu.title}
            {isSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Box sx={{ display: isSubMenuOpen ? 'block' : 'none' }}>
            {menu.children.map((child) => (
              <Link
                key={child.id}
                href={child.url || route(child.route as string)}
                style={{ width: '100%' }}
                className={url === child.url ? 'active' : ''}
              >
                <MenuItem onClick={toggleDrawer(false)} sx={{ pl: 4 }}>
                  {child.title}
                </MenuItem>
              </Link>
            ))}
          </Box>
        </Box>
      );
    }

    return (
      <Link
        className={url === menu.url ? 'active' : ''}
        key={menu.id}
        href={menu.url || route(menu.route as string)}
        style={{ width: '100%' }}
      >
        <MenuItem onClick={toggleDrawer(false)}>{menu.title}</MenuItem>
      </Link>
    );
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

          {menus?.map(renderMenuItem)}

          <Divider sx={{ my: 3 }} />
          {user ? (
            <>
              <MenuItem>
                <Link
                  style={{ width: '100%' }}
                  href={route('profile')}
                  className={component.startsWith('Profile') ? 'active' : ''}
                >
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
