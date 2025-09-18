import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Autocomplete, TextField, Stack, Alert, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { buyProduct, productListing, suggestProducts } from '../api/authApi';
import AmountPrompt from '../components/AmountPrompt';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ error: boolean; message: string } | null>(null);
  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(0);
  const limit = 6

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      const { products, total, error } = await productListing(page, limit, filters);
      if(error == "Unauthorized"){
        navigate('/login');
      }
      setTotalProducts(total);
      setProductList(products);
    }
    fetchProduct();
  }, [page, filters])

  const handleFilter = () => {
    let filter: { risk_level: string | null, investment_type: string | null } = {
      risk_level: null,
      investment_type: null
    };
    if (selectedRisk) {
      filter.risk_level = selectedRisk.value || selectedRisk.label;
    }
    if (selectedInvestType) {
      filter.investment_type = selectedInvestType.value || selectedInvestType.label;
    }
    setFilters(filter);
    setPage(1);
  }

  const removeFilter = () => {
    let filter: { risk_level: string | null, investment_type: string | null } = {
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
    setLoading(true);
    const { products } = await suggestProducts();
    setLoading(false);
    if (products && !Array.isArray(products)) {
      setProductList([products]);
    } else {
      setProductList(products || []);
    }
    setPage(1);
  }

  const handleInvestmentClick = async () => {
    setPromptOpen(true);
  }

  const handlePromptSubmit = async (amount: number) => {

  if (amount < minInvestment) {
  setAlertMessage({ error: true, message: 'Amount should be greater than minimum investment' });
    setOpenSnackbar(true);
    return;
  } 
  if (amount > maxInvestment) {
  setAlertMessage({ error: true, message: 'Amount should be less than maximum investment' });
    setOpenSnackbar(true);
    return;
  }

  const request = { productId: selectedProduct, amount: amount };
  const { data, error } = await buyProduct(request);

  if (error) {
  setAlertMessage({ error: true, message: error });
  } else {
  setAlertMessage({ error: false, message: data.message });
  }
  setOpenSnackbar(true);
};


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <AmountPrompt
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onSubmit={handlePromptSubmit}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertMessage && alertMessage.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alertMessage && alertMessage.message} <br />
        </Alert>
      </Snackbar>

      {loading ?
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <Button
            variant="outlined"
            loading
            loadingPosition="start"
            startIcon={<SaveIcon sx={{ color: "black" }} />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              minWidth: 180,
              color: "black",
              borderColor: "black",
              '&:hover': {
                borderColor: 'black',
                backgroundColor: '#6f6868ff',
              },
            }}
          >
            Loading
          </Button>
        </Stack>
        :
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {totalProducts ? `Explore all ${totalProducts} Products` : 'No matching Products found'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Autocomplete
              value={selectedRisk}
              onChange={(_, newValue) => setSelectedRisk(newValue)}
              options={riskLevelOptions}
              getOptionLabel={(option) => option.label}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Risk Level" />}
              clearOnEscape
            />
            <Autocomplete
              value={selectedInvestType}
              onChange={(_, newValue) => setSelectedInvestType(newValue)}
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
                  <Button variant="contained" fullWidth
                    onClick={() => {
                      setSelectedProduct(product.id);
                      setMinInvestment(product.min_investment);
                      setMaxInvestment(product.max_investment);
                      handleInvestmentClick();
                    }}
                  >
                    Invest Now
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>}
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
