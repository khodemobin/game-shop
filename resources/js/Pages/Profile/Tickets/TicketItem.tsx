import type { TicketType } from '@/types';
import { useForm } from '@inertiajs/react';
import { AttachFile, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Chip, Collapse, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material';

interface TicketItemProps {
  ticket: TicketType;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { data, setData, post, errors, processing } = useForm({
    message: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('tickets.reply', ticket.id), {
      preserveScroll: true,
      onSuccess: () => {
        setData('message', '');
        setData('image', null);
      }
    });
  };

  return (
    <Box sx={{ mb: 2, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='h6'>{ticket.title}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label={ticket.status} color={ticket.status === 'open' ? 'success' : 'default'} size='small' />
            <Chip
              label={ticket.priority}
              color={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'info'}
              size='small'
            />
          </Box>
        </Box>
        <IconButton onClick={() => setExpanded(!expanded)}>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          <Typography>{ticket.message}</Typography>
          {ticket.image && <Box component='img' src={`/storage/${ticket.image}`} sx={{ maxWidth: 200, mt: 1 }} />}

          {ticket.replies.map((reply) => (
            <Box
              key={reply.id}
              sx={{
                mt: 2,
                p: 1,
                bgcolor: reply.is_admin
                  ? theme.palette.mode === 'dark'
                    ? 'primary.dark'
                    : 'primary.light'
                  : theme.palette.mode === 'dark'
                    ? 'grey.900'
                    : 'grey.100',
                borderRadius: 1
              }}
            >
              <Typography>{reply.message}</Typography>
              {reply.image && <Box component='img' src={`/storage/${reply.image}`} sx={{ maxWidth: 200, mt: 1 }} />}
            </Box>
          ))}

          {ticket.status === 'open' && (
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                error={!!errors.message}
                helperText={errors.message}
                color={errors.message ? 'error' : 'primary'}
                fullWidth
                multiline
                rows={2}
                placeholder='Write a reply...'
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
              />
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Button component='label' startIcon={<AttachFile />}>
                  Attach Image
                  <input
                    type='file'
                    hidden
                    accept='image/*'
                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                  />
                </Button>
                <Button type='submit' variant='contained' disabled={processing}>
                  Send Reply
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
