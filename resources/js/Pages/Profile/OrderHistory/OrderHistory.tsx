import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

export default function OrderHistory() {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Order History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{/* Add order history data here */}</TableBody>
      </Table>
    </Box>
  );
}
