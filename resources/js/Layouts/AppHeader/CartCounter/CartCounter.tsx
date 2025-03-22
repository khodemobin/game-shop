import { router } from '@inertiajs/react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import type { CartItem } from '../types';

export interface CartCounterProps {
  items: CartItem[];
}

export default function CartCounter({ items }: CartCounterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalItems = Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (productId: number, quantity: number) => {
    router.patch(route('cart.update', productId), { quantity });
  };

  const removeItem = (productId: number) => {
    router.delete(route('cart.remove', productId));
  };

  return (
    <Box component='div' ml={3} mr={1}>
      <IconButton color='inherit' onClick={handleClick}>
        <Badge badgeContent={totalItems} color='error'>
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { width: 350, maxHeight: 400 }
          }
        }}
      >
        <Box component='div'>
          {Object.values(items).length > 0 ? (
            <>
              {Object.values(items).map((item) => (
                <MenuItem key={item.id} sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant='body1' noWrap>
                        {item.title}
                      </Typography>
                      <Typography variant='body2' color='primary'>
                        ${item.price}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Typography>{item.quantity}</Typography>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button size='small' color='error' onClick={() => removeItem(item.id)} sx={{ ml: 'auto' }}>
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant='h6'>Total: ${totalPrice.toFixed(2)}</Typography>
                <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={() => router.visit(route('checkout'))}>
                  Checkout
                </Button>
              </Box>
            </>
          ) : (
            <MenuItem>
              <Typography>Your cart is empty</Typography>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </Box>
  );
}
