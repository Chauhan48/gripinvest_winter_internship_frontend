import { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import InvestmentCharts from '../components/InvestmentCharts';

interface investments {
  id: string,
  product_name: string,
  user_id: string,
  product_id: string,
  amount: string,
  invested_at: string,
  status: string,
  expected_return: string,
  maturity_date: Date
}

const Investments: React.FC = () => {


    const [investments, setInvestments] = useState<investments[]>([]);
  // useEffect(() => {
  //   if(investments){
  //     console.log(investments);
  //   }
  // }, [investments]);
  const handleChildData = (data : investments[]) => {
    setInvestments(data);
  }

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
      <InvestmentCharts response={handleChildData} />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Investments
        </Typography>

        {investments.length === 0 ? (
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
            {investments.map((investment: any) => (
              <Card key={investment.id} sx={{ flex: '1 1 400px', minWidth: '400px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {investment.product_name}
                    </Typography>
                    <Chip
                      label={investment.status}
                      color={getStatusColor(investment.status) as any}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Invested: ${parseFloat(investment.amount).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Invested At: {new Date(investment.invested_at).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Expected Return: {(parseFloat(investment.expected_return) * 100).toFixed(2)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Maturity Date: {new Date(investment.maturity_date).toLocaleDateString()}
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
