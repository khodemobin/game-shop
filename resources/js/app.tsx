import AppTheme from '@/theme/AppTheme';
import { createInertiaApp } from '@inertiajs/react';
import { CssBaseline } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      hydrateRoot(
        el,
        <React.StrictMode>
          <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <App {...props} />
          </AppTheme>
        </React.StrictMode>
      );
      return;
    }

    createRoot(el).render(
      <React.StrictMode>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <App {...props} />
        </AppTheme>
      </React.StrictMode>
    );
  },
  progress: {
    color: '#4B5563'
  }
});
