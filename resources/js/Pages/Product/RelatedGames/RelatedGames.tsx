import ProductItem from '@/Components/ProductItem/ProductItem';
import type { ProductType } from '@/types';
import { Reviews } from '@mui/icons-material';
import { Box, Grid2, Typography } from '@mui/material';

export default function RelatedGames({ items }: { items: ProductType[] }) {
  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Related Games
      </Typography>
      <Grid2 container spacing={2}>
        {items.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={item.id}>
            <ProductItem product={item} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
