import Layout from '@/Layouts/Layout';
import Reviews from '@/Pages/Product/Reviews/Reviews';
import type { PageProps, ProductType } from '@/types';
import { Head } from '@inertiajs/react';
import { Container } from '@mui/material';
import GameInfo from './GameInfo/GameInfo';
import ProductOverview from './ProductOverview/ProductOverview';
import RelatedGames from './RelatedGames/RelatedGames';

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
  return (
    <Layout>
      <Head title={product.title} />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <ProductOverview product={product} isFavorite={isFavorite} />
        <GameInfo product={product} />
        <RelatedGames items={relatedProducts} />
        <Reviews productId={product.id} reviews={product.reviews ?? []} />
      </Container>
    </Layout>
  );
}
