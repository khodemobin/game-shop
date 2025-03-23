import ProductItem from '@/Components/ProductItem/ProductItem';
import Slider from '@/Components/Slider/Slider';
import type { ProductType } from '@/types';
import { Box, Typography } from '@mui/material';

export default function RelatedGames({ items }: { items: ProductType[] }) {
  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Related Games
      </Typography>
      <Slider>
        {items.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Slider>
    </Box>
  );
}
