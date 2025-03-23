import type { MenuItemType } from '@/types';
import { Box } from '@mui/material';
import MenuItem from './MenuItem';

export default function MenuItems({ menus }: { menus: MenuItemType[] }) {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {menus?.map((menu) => (
        <MenuItem key={menu.id} menu={menu} />
      ))}
    </Box>
  );
}
