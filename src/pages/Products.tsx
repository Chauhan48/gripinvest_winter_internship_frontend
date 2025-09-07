import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';

const Products: React.FC = () => {
  const sampleProducts = [
    {
      id: 1,
      name: 'Growth Fund',
      description: 'A diversified fund focused on long-term growth',
      minInvestment: 1000,
      riskLevel: 'Medium'
    },
    {
      id: 2,
      name: 'Conservative Fund',
      description: 'Low-risk investment with steady returns',
      minInvestment: 500,
      riskLevel: 'Low'
    },
    {
      id: 3,
      name: 'Aggressive Fund',
      description: 'High-risk, high-reward investment opportunity',
      minInvestment: 2500,
      riskLevel: 'High'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Investment Products
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore our range of investment opportunities
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {sampleProducts.map((product) => (
            <Card key={product.id} sx={{ flex: '1 1 350px', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Minimum Investment:</strong> ${product.minInvestment}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Risk Level:</strong> {product.riskLevel}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" fullWidth>
                  Invest Now
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
