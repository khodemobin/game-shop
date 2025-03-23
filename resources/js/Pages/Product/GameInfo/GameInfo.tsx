import type { ProductType } from '@/types';
import { Grid2, Typography } from '@mui/material';
import KeySpecs from './KeySpecs/KeySpecs';

export default function GameInfo({ product }: { product: ProductType }) {
  return (
    <Grid2 container spacing={4} sx={{ mb: 6 }}>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Typography variant='h5' gutterBottom>
          Game Information
        </Typography>
        <Typography variant='body1'>{product.description}</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <Typography variant='h5' gutterBottom>
          Key Specifications
        </Typography>
        <KeySpecs specs={product.specs ?? []} />
      </Grid2>
    </Grid2>
  );
}
