import ProductItem from '@/Components/ProductItem/ProductItem';
import type { ProductType } from '@/types';
import { Box, Container, Divider, Typography } from '@mui/material';

export default function Favorites({ items }: { items: ProductType[] }) {
  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Favorite Games
      </Typography>
      <Divider />
      <Container maxWidth='lg' sx={{ mt: 2, mb: 8, padding: 0 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {items.map((product) => (
            <ProductItem key={product.id} product={product} isFavorite={true} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
