import { useForm } from '@inertiajs/react';
import { AttachFile } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  TextField
} from '@mui/material';

interface NewTicketDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewTicketDialog({ open, onClose }: NewTicketDialogProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    message: '',
    priority: 'medium',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('tickets.store'), {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <TextField
                error={!!errors.title}
                helperText={errors.title}
                color={errors.title ? 'error' : 'primary'}
                fullWidth
                name='title'
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor='priority'>Priority</FormLabel>
              <TextField
                error={!!errors.priority}
                helperText={errors.priority}
                color={errors.priority ? 'error' : 'primary'}
                select
                name='priority'
                fullWidth
                value={data.priority}
                onChange={(e) => setData('priority', e.target.value)}
              >
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
              </TextField>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor='message'>Message</FormLabel>
              <TextField
                error={!!errors.message}
                helperText={errors.message}
                color={errors.message ? 'error' : 'primary'}
                name='message'
                multiline
                fullWidth
                rows={4}
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
              />
            </FormControl>

            <Button component='label' startIcon={<AttachFile />} variant='outlined'>
              Attach Image
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={(e) => setData('image', e.target.files?.[0] || null)}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={processing}>
            Create Ticket
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
