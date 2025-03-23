import type { ProductType } from '@/types';
import { router } from '@inertiajs/react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Button, Grid2, IconButton, Paper, Rating, Typography } from '@mui/material';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductPlatforms from './ProductPlatforms/ProductPlatforms';

export default function ProductOverview({ product, isFavorite }: { product: ProductType; isFavorite: boolean }) {
  const handleAddToCart = () => {
    router.post(route('cart.add', product.id));
  };

  const handleToggleFavorite = () => {
    router.post(route('favorites.toggle', product.id));
  };

  return (
    <Grid2 container spacing={4} sx={{ mb: 6 }}>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <ProductGallery media={product.media} title={product.title} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
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

          <ProductPlatforms platforms={product.platforms ?? []} />

          <Typography variant='h4' color='primary' gutterBottom>
            ${product.price}
          </Typography>

          {product.is_pre_order && (
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='primary' sx={{ fontWeight: 500 }}>
                Pre-order
              </Typography>
              <Typography variant='body2'>Release date: {product.release_date}</Typography>
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
      </Grid2>
    </Grid2>
  );
}
