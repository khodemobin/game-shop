import type { Theme } from '@mui/material';

export const globalStyles = (theme: Theme) => {
  return {
    a: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    'a.active': {
      color: theme.palette.primary.main
    },
    'a.active button': {
      color: theme.palette.primary.main
    }
  };
};
