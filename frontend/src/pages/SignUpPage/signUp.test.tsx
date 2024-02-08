import React from 'react';
import '@testing-library/jest-dom'
import SignUp from '.'; 
import { render, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('SignUp component', () => {
  it('should render the LoginTemplate with provided  body', () => {
    render(<SignUp />);
    const loginComponent = screen.getAllByText(/Sign Up/)[0];
    expect(loginComponent).toBeInTheDocument();
  });

  it('should render login-panel image', () => {
    render(<SignUp />);
    const image = screen.getByRole('img', { name: 'login-panel image' });
    expect(image).toBeInTheDocument();
  });

});
