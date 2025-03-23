import type { TicketType } from '@/types';
import { Box, Button, List, Typography } from '@mui/material';
import { useState } from 'react';
import NewTicketDialog from './NewTicketDialog';
import TicketItem from './TicketItem';

interface TicketListProps {
  tickets: TicketType[];
}

export default function TicketList({ tickets }: TicketListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h5'>Support Tickets</Typography>
        <Button variant='contained' onClick={() => setIsDialogOpen(true)}>
          New Ticket
        </Button>
      </Box>

      <List>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </List>

      <NewTicketDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Box>
  );
}
