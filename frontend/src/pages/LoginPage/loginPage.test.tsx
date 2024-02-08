import React from 'react';
import '@testing-library/jest-dom'
import LoginPage from '.'; 
import { render, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage component', () => {
  it('should render the LoginTemplate with provided  body', () => {
    render(<LoginPage />);
    const loginComponent = screen.getByText(/login/);
    expect(loginComponent).toBeInTheDocument();
  });

  it('should render correct image', () => {
    render(<LoginPage />);
    const image = screen.getByRole('img', { name: 'login-panel image' });
    expect(image).toBeInTheDocument();
  });

});
