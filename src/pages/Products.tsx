import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Autocomplete, TextField } from '@mui/material';
import { productListing, suggestProducts } from '../api/authApi';
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

  const [selectedRisk, setSelectedRisk] = useState<{ label: string; value: string } | null>(null);
  const [selectedInvestType, setSelectedInvestType] = useState<{ label: string; value: string } | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{ risk_level: string | null; investment_type: string | null }>({ risk_level: null, investment_type: null });
  const [productList, setProductList] = useState<Product[] | any>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [suggestion, setSuggestion] = useState(false);
  const limit = 6

  useEffect(() => {
    const fetchProduct = async () => {
      const {products, total} = await productListing(page, limit, filters);
      setTotalProducts(total);
      setProductList(products);
    }
    fetchProduct();
  }, [page, filters])

  const handleFilter = () => {
    let filter : {risk_level: string | null, investment_type: string | null} = {
      risk_level: null,
      investment_type: null
    };
    if(selectedRisk){
      filter.risk_level = selectedRisk.value || selectedRisk.label;
    }
    if(selectedInvestType){
      filter.investment_type = selectedInvestType.value || selectedInvestType.label;
    }
    setFilters(filter);
    setPage(1);
  }

  const removeFilter = () => {
    let filter : {risk_level: string | null, investment_type: string | null} = {
      risk_level: null,
      investment_type: null
    };
    setSelectedInvestType(null);
    setSelectedRisk(null);
    setFilters(filter);
    setSuggestion(!suggestion);
    setPage(1);
  }

  const suggestFilter = async () => {
    setSelectedInvestType(null);
    setSelectedRisk(null);
    const {products} = await suggestProducts();
    // If products is not an array, wrap it in an array
    if (products && !Array.isArray(products)) {
      setProductList([products]);
    } else {
      setProductList(products || []);
    }
    console.log(products);
    setPage(1);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {totalProducts ? `Explore all ${totalProducts} Products` : 'No matching Products found'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
          value={selectedRisk}
          onChange={(event, newValue) => setSelectedRisk(newValue)}
          options={riskLevelOptions}
          getOptionLabel={(option) => option.label}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Risk Level" />}
          clearOnEscape
        />
        <Autocomplete
          value={selectedInvestType}
          onChange={(event, newValue) => setSelectedInvestType(newValue)}
          options={investmentTypeOptions}
          getOptionLabel={(option) => option.label}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Investment Type" />}
          clearOnEscape
        />
        <Button variant="contained" onClick={handleFilter} > Apply Filter </Button>
        <Button variant="contained" onClick={removeFilter} > Remove Filter </Button>
        <Button variant="contained" onClick={suggestFilter} > Suggest Products ✨ </Button>
      </Box>
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

const riskLevelOptions = [
  { label: 'low', value: 'low' },
  { label: 'medium', value: 'medium' },
  { label: 'high', value: 'high' },
];

const investmentTypeOptions = [
  { label: 'bond', value: 'bond' },
  { label: 'fd', value: 'fd' },
  { label: 'mf', value: 'mf' },
  { label: 'etf', value: 'etf' },
  { label: 'other', value: 'other' },
];


export default Products;
