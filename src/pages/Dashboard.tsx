import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Welcome to your WealthWise dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Investments
              </Typography>
              <Typography variant="h4" color="primary">
                $0.00
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Active Products
              </Typography>
              <Typography variant="h4" color="primary">
                0
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Portfolio Value
              </Typography>
              <Typography variant="h4" color="primary">
                $0.00
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
