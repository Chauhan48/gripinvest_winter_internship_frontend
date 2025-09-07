import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { productListing } from '../api/authApi';
interface Product {
  id: string,
  name: string,
  investment_type: string,
  tenure_months: number,
  description: string,
  min_investment: number,
  max_investment: number,
  risk_level: string
}

const Products: React.FC = () => {

  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<Product[] | any>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 6

  useEffect(() => {
    const fetchProduct = async () => {
      const {products, total} = await productListing(page, limit);
      setTotalProducts(total);
      setProductList(products);
    }
    fetchProduct();
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Explore all {totalProducts} Products
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {productList.map((product: Product) => (
            <Card key={product.id} sx={{ flex: '1 1 350px', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Minimum Investment:</strong> ${product.min_investment}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Maximum Investment:</strong> ${product.max_investment}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Investment Type:</strong> {product.investment_type}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Tenure (months):</strong> {product.tenure_months}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Risk Level:</strong> {product.risk_level}
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
