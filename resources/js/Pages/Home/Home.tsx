import GuestLayout from '@/Layouts/GuestLayout';
import { Box, Container, Typography } from '@mui/material';
import Categories from './Categories/Categories';
import ProductItem from './ProductItem/ProductItem';
import type { HomeProps } from './types';

export default function Home({
  featuredProducts,
  categories,
  newReleases,
  topRated,
  userFavorites,
  filters
}: HomeProps) {
  return (
    <GuestLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Categories filters={filters} categories={categories} />

        {/* Featured Products */}
        <Container maxWidth='lg' sx={{ mb: 8 }}>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Featured Games
          </Typography>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 3 }}
          >
            {featuredProducts.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Box>
        </Container>

        {/* New Releases */}
        <Container maxWidth='lg' sx={{ mb: 8 }}>
          <Typography variant='h4' sx={{ mb: 4 }}>
            New Releases
          </Typography>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}
          >
            {newReleases.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Box>
        </Container>

        {/* Top Rated */}
        <Container maxWidth='lg'>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Top Rated
          </Typography>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}
          >
            {topRated.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Box>
        </Container>
      </Box>
    </GuestLayout>
  );
}
