import { render, fireEvent, screen } from '@testing-library/react'
import ResetPassword from '.'
import React from 'react'


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

let mockHandleClick: jest.Mock

test('test the component renders or not', () => {
  mockHandleClick = jest.fn()

  render(
      <ResetPassword />
  )
  expect(screen.getByTestId('resetcode').textContent).toBe('Enter Reset Code')
  expect(screen.getByTestId('enterresetcode').textContent).toBe(
    'Please enter reset code sent to your email to proceed further'
  )
  const loginElement = screen.getByTestId('login');
  fireEvent.click(loginElement);
  expect(loginElement).toBeDefined();
  expect(mockNavigate).toHaveBeenCalledWith("/login");

})
test('checks whether resetcode entered and after click reset button', () => {
  mockHandleClick = jest.fn()

  render(
      <ResetPassword />
  )
  const inputField = screen.getByRole('textbox')
  fireEvent.change(inputField, { target: { value: 'abcd1234' } })
  const actionButton = screen.getByTestId('button')
  if (actionButton) {
    fireEvent.click(actionButton)
  }
})

test('checks whether resetcode entered and after click reset button', () => {
  const { container } = render(
      <ResetPassword/>
  )
  const inputField2 = screen.getByRole('textbox')
  fireEvent.change(inputField2, { target: { value: 'abcd12' } })
  const actionButton2 = screen.getByTestId('button')
  if (actionButton2) {
    fireEvent.click(actionButton2)
  }

  const passwordInput = screen.getByRole('textbox')

  const confirmPasswordInput = container.querySelector(
    'input[placeholder="\u00A0"][type="password"]'
  )

  fireEvent.change(passwordInput, { target: { value: 'abcdefgh1' } })
  if (confirmPasswordInput)
    fireEvent.change(confirmPasswordInput, { target: { value: 'abcdefgh1' } })

  const actionButton = screen.getByTestId('button')
  if (actionButton) {
    fireEvent.click(actionButton)
  }
})

test('handleReset should set reset state to true', () => {
    const { getByTestId } = render(      <ResetPassword />);
    fireEvent.click(getByTestId('resetcode'));
  })


