import { Link } from '@inertiajs/react';
import { Box, Container } from '@mui/material';
import type { CategoriesProps } from '../types';
import CategoryItem from './CategoryItem/CategoryItem';

export default function Categories({ categories, filters }: CategoriesProps) {
  return (
    <Container maxWidth='lg' sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        <Link href={route('home')} className='no-underline' preserveScroll>
          <Box
            sx={{
              px: 3,
              py: 1,
              bgcolor: !filters.category ? 'primary.main' : 'background.paper',
              color: !filters.category ? 'primary.contrastText' : 'text.primary',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            All Games
          </Box>
        </Link>
        {categories.map((category) => (
          <CategoryItem filters={filters} key={category.id} category={category} />
        ))}
      </Box>
    </Container>
  );
}
