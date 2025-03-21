import Reviews from '@/Components/Reviews/Reviews';
import GuestLayout from '@/Layouts/GuestLayout';
import type { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Container, Grid, IconButton, Paper, Rating, Typography } from '@mui/material';
import type { ProductType } from '../Home/types';
import KeySpecs from './components/KeySpecs';
import ProductGallery from './components/ProductGallery';
import ProductPlatforms from './components/ProductPlatforms';

export default function Product({
  product,
  relatedProducts,
  isFavorite
}: PageProps<{
  product: ProductType & {
    description: string;
    platforms: string[];
    releaseDate: string;
    isPreorder: boolean;
    specs: { label: string; value: string }[];
    images: string[];
  };
  relatedProducts: ProductType[];
  isFavorite: boolean;
}>) {
  const handleAddToCart = () => {
    router.post(route('cart.add', product.id));
  };

  const handleToggleFavorite = () => {
    router.post(route('favorites.toggle', product.id));
  };

  return (
    <GuestLayout>
      <Head title={product.title} />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        {/* Section 1: Product Overview */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={7}>
            <ProductGallery media={product.media} title={product.title} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant='h4' gutterBottom>
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
                  ({product.rating})
                </Typography>
              </Box>

              <ProductPlatforms platforms={product.platforms} />

              <Typography variant='h4' color='primary' gutterBottom>
                ${product.price}
              </Typography>

              {product.isPreorder && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='primary' sx={{ fontWeight: 500 }}>
                    Pre-order
                  </Typography>
                  <Typography variant='body2'>Release date: {product.releaseDate}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' size='large' fullWidth onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <IconButton onClick={handleToggleFavorite}>
                  {isFavorite ? <Favorite color='error' /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Section 2: Game Info & Specs */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={7}>
            <Typography variant='h5' gutterBottom>
              Game Information
            </Typography>
            <Typography variant='body1'>{product.description}</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant='h5' gutterBottom>
              Key Specifications
            </Typography>
            <KeySpecs specs={product.specs} />
          </Grid>
        </Grid>

        {/* Section 3: Related Games */}
        <Box>
          <Typography variant='h5' gutterBottom>
            Related Games
          </Typography>
          <Grid container spacing={2}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                {/* Use your existing ProductItem component here */}
              </Grid>
            ))}
          </Grid>
          <Reviews productId={product.id} reviews={product.reviews} />
        </Box>
      </Container>
    </GuestLayout>
  );
}
