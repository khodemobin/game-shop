import { Button, Box } from '@mui/material';

export default function NavLinks() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button variant='text' color='info' size='small'>
        Features
      </Button>
      <Button variant='text' color='info' size='small'>
        Testimonials
      </Button>
      <Button variant='text' color='info' size='small'>
        Highlights
      </Button>
      <Button variant='text' color='info' size='small'>
        Pricing
      </Button>
      <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
        FAQ
      </Button>
      <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
        Blog
      </Button>
    </Box>
  );
}
