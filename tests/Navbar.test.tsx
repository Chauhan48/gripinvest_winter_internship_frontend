import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';

function renderWithRouter(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/products" element={<div>Products Page</div>} />
        <Route path="/investments" element={<div>Investments Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  test('logo click navigates to /dashboard', async () => {
    renderWithRouter(['/']);
    const user = userEvent.setup();

    const logos = screen.getAllByText('WealthWise');
    await user.click(logos[0]);

    expect(await screen.findByText('Dashboard Page')).toBeInTheDocument();
  });

  test('top nav Products button navigates to /products', async () => {
    renderWithRouter(['/']);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Products' }));
    expect(await screen.findByText('Products Page')).toBeInTheDocument();
  });

  test('user menu has Profile and Logout options that navigate', async () => {
    renderWithRouter(['/']);
    const user = userEvent.setup();

    const avatarButton = screen.getByRole('button', { name: /open settings/i });
    await user.click(avatarButton);

    await user.click(await screen.findByText('Profile'));
    expect(await screen.findByText('Profile Page')).toBeInTheDocument();

    await user.click(avatarButton);
    await user.click(await screen.findByText('Logout'));
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  }, 15000);
});
