import Layout from '@/Layouts/Layout';
import type { PageProps, ProductType } from '@/types';
import { Head } from '@inertiajs/react';
import { Container, Grid, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import AccountSettings from './AccountSettings/AccountSettings';
import Favorites from './Favorites/Favorites';
// import OrderHistory from './components/OrderHistory';
import PersonalInfo from './PersonalInfo/PersonalInfo';

export default function Profile({
  favorites
}: PageProps<{
  favorites: ProductType[];
}>) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Layout>
      <Head title='Profile' />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Tabs
                orientation='vertical'
                value={currentTab}
                onChange={handleTabChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label='Personal Info' />
                <Tab label='Account Settings' />
                <Tab label='Order History' />
                <Tab label='Favorites' />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3 }}>
              {currentTab === 0 && <PersonalInfo />}
              {currentTab === 1 && <AccountSettings />}
              {/* {currentTab === 2 && <OrderHistory />} */}
              {currentTab === 3 && <Favorites items={favorites} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
