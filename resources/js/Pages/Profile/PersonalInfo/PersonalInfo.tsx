import { useForm, usePage } from '@inertiajs/react';
import { Box, Button, Divider, FormControl, FormLabel, Grid2, TextField, Typography } from '@mui/material';

export default function PersonalInfo() {
  const { auth } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    name: auth.user.name,
    email: auth.user.email
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('profile.update'));
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        Personal Info
      </Typography>

      <Divider />
      <Grid2 mt={2} container spacing={2}>
        <FormControl fullWidth>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            color={errors.name ? 'error' : 'primary'}
            name='name'
            autoFocus
            required
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <TextField
            placeholder='your@email.com'
            autoFocus
            required
            error={!!errors.email}
            helperText={errors.email}
            color={errors.email ? 'error' : 'primary'}
            type='email'
            name='email'
            value={data.email}
            autoComplete='email'
            onChange={(e) => setData('email', e.target.value)}
          />
        </FormControl>

        <Button sx={{ marginTop: 2 }} type='submit' variant='contained' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Grid2>
    </Box>
  );
}
