import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';

function AppUnderTest() {
  return (
    <Routes>
      <Route path="/login" element={<div>Login Page</div>} />
      <Route
        path="/secret"
        element={
          <ProtectedRoute>
            <div>Secret Page</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('redirects to /login when unauthenticated', async () => {
    localStorage.setItem('isAuthenticated', 'false');

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <AppUnderTest />
      </MemoryRouter>
    );

    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });

  test('renders children when authenticated', async () => {
    localStorage.setItem('isAuthenticated', 'true');

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <AppUnderTest />
      </MemoryRouter>
    );

    expect(await screen.findByText('Secret Page')).toBeInTheDocument();
  });
});
