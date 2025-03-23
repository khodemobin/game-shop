import { Link, router } from '@inertiajs/react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Typography } from '@mui/material';
import type { ProductItemProps } from '../types';

export default function ProductItem({ product, isFavorite }: ProductItemProps) {
  const handleAddToCart = () => {
    router.post(
      route('cart.add', product.id),
      {},
      {
        preserveScroll: true,
        preserveState: true
      }
    );
  };

  const handleToggleFavorite = () => {
    router.post(
      route('favorites.toggle', product.id),
      {},
      {
        preserveScroll: true,
        preserveState: true
      }
    );
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Link href={route('products.show', product.id)}>
        <CardMedia component='img' height='200' image={product.image} alt={product.title} sx={{ objectFit: 'cover' }} />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h6' component='div'>
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} precision={0.1} readOnly size='small' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>
        <Typography variant='h6' color='primary'>
          ${product.price}
        </Typography>
        {product.category && (
          <Typography variant='body2' color='text.secondary'>
            {product.category.name}
          </Typography>
        )}
        <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? <Favorite color='error' /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
}
