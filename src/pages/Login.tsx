import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api/authApi';

const Login: React.FC = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinToggle, setSigninToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!signinToggle) {
        // Register
        const { message, error } = await registerUser({ first_name, last_name, email, password_hash: password });
        if (error) {
          setError(error);
          setOpenSnackbar(true);
        } else {
          setSuccess(message || 'Registration successful!');
          setOpenSnackbar(true);
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/dashboard');
        }
      } else {
        // Login
        const { message, error } = await loginUser({ email, password_hash: password });
        if (error) {
          setError(error);
          setOpenSnackbar(true);
        } else {
          setSuccess(message || 'Login successful!');
          setOpenSnackbar(true);
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('Unexpected error occurred.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSigninToglle = () => {
    setSigninToggle(!signinToggle);
    setError(null);
    setSuccess(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              {!signinToggle && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoComplete="first_name"
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
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                disabled={loading}
              >
                {signinToggle ? "Sign In" : "Register"}
              </Button>
              <p onClick={handleSigninToglle} style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
                {signinToggle ? "New user? Register" : "Already have an account? Sign In"}
              </p>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error : success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
