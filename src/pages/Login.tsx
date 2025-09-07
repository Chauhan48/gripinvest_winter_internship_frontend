import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinToggle, setSigninToggle] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  const handleSigninToglle = () => {
    setSigninToggle(!signinToggle);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          WealthWise
        </Typography>
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              {signinToggle ? "Sign In" : "Register"}
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              {signinToggle ? (<><TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="first_name"
                autoFocus
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="last_name"
                  autoFocus
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                /></>) : ''}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {signinToggle ? "Register" : "Sign In"}
              </Button>
              <p onClick={handleSigninToglle} style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
                {signinToggle ? "Already have an account? Sign In" : "New user? Register"}
              </p>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
