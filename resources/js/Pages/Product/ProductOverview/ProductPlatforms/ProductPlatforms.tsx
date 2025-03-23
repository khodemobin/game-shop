import { Box, Chip } from '@mui/material';

interface ProductPlatformsProps {
  platforms: string[];
}

export default function ProductPlatforms({ platforms }: ProductPlatformsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      {platforms.map((platform) => (
        <Chip key={platform} label={platform.toUpperCase()} variant='outlined' size='small' />
      ))}
    </Box>
  );
}
