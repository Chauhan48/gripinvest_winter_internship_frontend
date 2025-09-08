import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';

interface investments {
  id: string,
  user_id: string,
  product_id: string,
  amount: string,
  invested_at: string,
  status: string,
  expected_return: number,
  maturity_date: Date
}

const Investments: React.FC = () => {
  const sampleInvestments = [
    {
      id: 1,
      productName: 'Growth Fund',
      amount: 5000,
      currentValue: 5250,
      status: 'Active',
      dateInvested: '2024-01-15'
    },
    {
      id: 2,
      productName: 'Conservative Fund',
      amount: 2000,
      currentValue: 2100,
      status: 'Active',
      dateInvested: '2024-02-01'
    }
  ];
  const [investments, setInvestments] = useState<investments | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Investments
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Track your investment portfolio performance
        </Typography>

        {sampleInvestments.length === 0 ? (
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" color="text.secondary">
                No investments found
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Start investing by exploring our products
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {sampleInvestments.map((investment) => (
              <Card key={investment.id} sx={{ flex: '1 1 400px', minWidth: '400px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {investment.productName}
                    </Typography>
                    <Chip
                      label={investment.status}
                      color={getStatusColor(investment.status) as any}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Invested: ${investment.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Current Value: ${investment.currentValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Date Invested: {new Date(investment.dateInvested).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Return: {((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Investments;
