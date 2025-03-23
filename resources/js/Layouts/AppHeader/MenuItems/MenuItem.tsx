import type { MenuItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Box, Button, MenuItem as MUIMenuItem, Menu } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function MenuItem({ menu }: { menu: MenuItemType }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<MenuItemType | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { url } = usePage();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, menu: MenuItemType) => {
    clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setActiveMenu(null);
    }, 300);
  };

  if (menu?.children?.length) {
    return (
      <Box
        key={menu.id}
        sx={{ position: 'relative' }}
        onMouseEnter={(e) => handleMouseEnter(e, menu)}
        onMouseLeave={handleMouseLeave}
      >
        <Button variant='text' color='info' size='small'>
          {menu.title}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && activeMenu?.id === menu.id}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              onMouseEnter: () => clearTimeout(timeoutRef.current),
              onMouseLeave: handleMouseLeave
            }
          }}
        >
          {menu.children.map((child) => (
            <Link
              onClick={() => setAnchorEl(null)}
              key={child.id}
              href={child.url || route(child.route as string)}
              className={url === child.url ? 'active' : ''}
            >
              <MUIMenuItem>{child.title}</MUIMenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
    );
  }

  return (
    <Link key={menu.id} href={menu.url || route(menu.route as string)} className={url === menu.url ? 'active' : ''}>
      <Button variant='text' color='info' size='small'>
        {menu.title}
      </Button>
    </Link>
  );
}
