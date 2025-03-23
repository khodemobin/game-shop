import ProductItem from '@/Components/ProductItem/ProductItem';
import Slider from '@/Components/Slider/Slider';
import Layout from '@/Layouts/Layout';
import { Box, Container, Typography } from '@mui/material';
import Categories from './Categories/Categories';
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
    <Layout>
      <Categories filters={filters} categories={categories} />

      {/* Featured Products */}
      <Container maxWidth='lg' sx={{ mb: 8 }}>
        <Typography variant='h4' sx={{ mb: 4 }}>
          Featured Games
        </Typography>
        <Box>
          <Slider>
            {featuredProducts.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Slider>
        </Box>
      </Container>

      {/* New Releases */}
      <Container maxWidth='lg' sx={{ mb: 8 }}>
        <Typography variant='h4' sx={{ mb: 4 }}>
          New Releases
        </Typography>
        <Box>
          <Slider>
            {newReleases.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Slider>
        </Box>
      </Container>

      {/* Top Rated */}
      <Container maxWidth='lg'>
        <Typography variant='h4' sx={{ mb: 4 }}>
          Top Rated
        </Typography>
        <Box>
          <Slider>
            {topRated.map((product) => (
              <ProductItem key={product.id} product={product} isFavorite={userFavorites.includes(product.id)} />
            ))}
          </Slider>
        </Box>
      </Container>
    </Layout>
  );
}
