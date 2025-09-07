import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { userDashboard } from '../api/userApi';

const Dashboard: React.FC = () => {

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data, error } = await userDashboard();
      if (error) {
        setError(error);
      } else if (data) {
        console.log(data)
        setTotalInvestment(data.total_investment || 0);
        setTotalProducts(data.total_products || 0);
        setUserBalance(data.data.balance || 0);
        setUserName(data.data.first_name + ' ' + data.data.last_name);
      }
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6">Loading dashboard...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {userName}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Welcome to your WealthWise dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Investment
              </Typography>
              <Typography variant="h4" color="primary">
                {totalInvestment}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Products
              </Typography>
              <Typography variant="h4" color="primary">
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Balance
              </Typography>
              <Typography variant="h4" color="primary">
                {userBalance}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
