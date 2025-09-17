import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Stub APIs used by pages to avoid network calls during tests
jest.mock('../src/api/userApi', () => ({
  userDashboard: async () => ({ data: { total_investment: 0, total_products: 0, data: { balance: 0, first_name: 'John', last_name: 'Doe' } } }),
}));

jest.mock('../src/api/authApi', () => ({
  portfolioSummary: async () => ({ data: { summary: { summary: '', status_distribution: { active: '0', matured: '0', cancelled: '0' } } } }),
  productListing: async () => ({ products: [], total: 0 }),
  suggestProducts: async () => ({ products: [] }),
  buyProduct: async () => ({ data: { message: 'ok' } }),
  registerUser: async () => ({ message: 'ok' }),
  loginUser: async () => ({ message: 'ok' }),
  updateProfile: async () => ({ message: 'ok' }),
}));

// Mock problematic components to bypass TS/DOM specifics during tests
jest.mock('../src/pages/Products', () => ({ __esModule: true, default: () => <div>Products Page</div> }));
jest.mock('../src/pages/Investments', () => ({ __esModule: true, default: () => <div>Investments Page</div> }));
jest.mock('../src/components/ForgotPassword', () => ({ __esModule: true, default: () => <div>Forgot Password Page</div> }));
jest.mock('../src/components/Profile', () => ({ __esModule: true, default: () => <div>Profile Page</div> }));


describe('App routing', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('renders Login at /login', async () => {
    window.history.pushState({}, '', '/login');
    render(<App />);

    expect(await screen.findByText('WealthWise')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('redirects / to /dashboard; guarded by ProtectedRoute', async () => {
    localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/');

    render(<App />);

    expect(await screen.findByText(/Welcome to your WealthWise dashboard/i)).toBeInTheDocument();
  });
});
