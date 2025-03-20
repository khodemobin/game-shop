import { Link } from '@inertiajs/react';
import { Box } from '@mui/material';
import type { CategoryItemProps } from '../../types';

export default function CategoryItem({ category, filters }: CategoryItemProps) {
  return (
    <Link key={category.id} href={route('home', { category: category.id })} className='no-underline' preserveScroll>
      <Box
        sx={{
          px: 3,
          py: 1,
          bgcolor: filters.category === category.id.toString() ? 'primary.main' : 'background.paper',
          color: filters.category === category.id.toString() ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: 'action.hover' }
        }}
      >
        {category.name}
      </Box>
    </Link>
  );
}
