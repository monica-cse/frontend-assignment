import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import StorePage from "./StorePage"; 
import store from '../store/store';
import { describe, it, expect } from 'vitest';

describe('StorePage Component', () => {
  it('renders search input and all pricing filters with Reset button', () => {
    render(
      <Provider store={store}>
        <StorePage />
      </Provider>
    );

  
    expect(screen.getByPlaceholderText(/search by title or user/i)).toBeInTheDocument();

    
    expect(screen.getByLabelText(/Paid/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Free/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View Only/i)).toBeInTheDocument();

   
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });
});
