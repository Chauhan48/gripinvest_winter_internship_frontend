import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { userDashboard } from '../api/userApi';
import { portfolioSummary } from '../api/authApi';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface statusDistribution {
  active: string,
  matured: string,
  cancelled: string
}

const Dashboard: React.FC = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [summary, setSummary] = useState('');
  const [fetchAiResponse, setFetchAiResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<statusDistribution>({active: '', matured: '', cancelled: ''});

  const data = {
    labels: ['Active', 'Matured', 'Cancelled'],
    datasets: [
      {
        label: 'Status Distribution',
        data: [status.active, status.matured, status.cancelled],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)', 
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data, error } = await userDashboard();
      if (error) {
        setError(error);
      } else if (data) {
        setTotalInvestment(data.total_investment || 0);
        setTotalProducts(data.total_products || 0);
        setUserBalance(data.data.balance || 0);
        setUserName(data.data.first_name + ' ' + data.data.last_name);
      }
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchPortfolioSummary = async () => {
      try {
        const { data, error } = await portfolioSummary();
        if (error) {
          setError(error);
          return;
        }
        if (data) {
          setSummary(data.summary.summary);
          setStatus(data.summary.status_distribution);
        }
        setFetchAiResponse(true);
      } catch (err) {
        setError("Failed to fetch portfolio summary");
      }
    };

    fetchPortfolioSummary();
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
      {fetchAiResponse ?
        (
          <>
        <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <CardContent>
          <Typography variant="h4" component="h2">
            AI powered portfolio overview
          </Typography>
          <Typography variant="h6" component="h2">
            {summary}
          </Typography>
          </CardContent>
        </Card>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
          Investment status
        </Typography>
        <Pie data={data} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Active
              </Typography>
              <Typography variant="h4" color="primary">
                {status.active}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Matured
              </Typography>
              <Typography variant="h4" color="primary">
                {status.matured}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Cancelled
              </Typography>
              <Typography variant="h4" color="primary">
                {status.cancelled}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        </Box>
        </>
        )
        :
        (<LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon sx={{ color: "black" }} />}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            minWidth: 180,
            color: "black",
            borderColor: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "#6f6868ff",
            },
          }}
        >
          AI is summarizing you investments ✨
        </LoadingButton>)
      }
    </Container>
  );
};

export default Dashboard;
