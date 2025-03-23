import Layout from '@/Layouts/Layout';
import type { PageProps, ProductType } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container, Grid2, Paper, Tab, Tabs } from '@mui/material';
import AccountSettings from './AccountSettings/AccountSettings';
import Favorites from './Favorites/Favorites';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import TicketList from './Tickets/TicketList';

const tabs = [
  { label: 'Personal Info', route: 'profile' },
  { label: 'Account Settings', route: 'profile.settings' },
  { label: 'Order History', route: 'profile.orders' },
  { label: 'Favorites', route: 'profile.favorites' },
  { label: 'Tickets', route: 'profile.tickets' }
];

export default function Profile({
  favorites,
  tickets
}: PageProps<{
  favorites?: ProductType[];
  tickets?: any[];
}>) {
  const { url } = usePage();
  const currentTab = tabs.findIndex((tab) => route().current(tab.route));

  return (
    <Layout>
      <Head title='Profile' />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Tabs orientation='vertical' value={currentTab} sx={{ borderRight: 1, borderColor: 'divider' }}>
                {tabs.map((tab, index) => (
                  <Tab key={tab.route} label={tab.label} component={Link} href={route(tab.route)} />
                ))}
              </Tabs>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 9 }}>
            <Paper sx={{ p: 3 }}>
              {route().current('profile') && <PersonalInfo />}
              {route().current('profile.settings') && <AccountSettings />}
              {route().current('profile.favorites') && favorites && <Favorites items={favorites} />}
              {route().current('profile.tickets') && tickets && <TicketList tickets={tickets} />}
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Layout>
  );
}
