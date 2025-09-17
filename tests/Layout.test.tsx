import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../src/components/layout/Layout';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Layout', () => {
  test('renders Navbar, Footer, and children', () => {
    renderWithRouter(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    // Navbar brand text appears twice depending on breakpoints, assert at least once
    expect(screen.getAllByText('WealthWise').length).toBeGreaterThan(0);

    // Child content
    expect(screen.getByText('Child Content')).toBeInTheDocument();

    // Footer contains brand link and current year
    const year = new Date().getFullYear().toString();
    expect(screen.getAllByText(/WealthWise/).length).toBeGreaterThan(0);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(new RegExp(`${year}`));
  });
});


