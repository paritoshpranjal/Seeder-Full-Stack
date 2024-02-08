import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import SideNavigation from '.'

jest.mock('../../../../public/assets/icons/Logo.svg', () => 'MockedSeederIcon')
jest.mock('../../../../public/assets/icons/flash.svg', () => 'MockedWatchIcon')
jest.mock('../../../../public/assets/icons/home.svg', () => 'MockedHomeIcon')
jest.mock('../../../../public/assets/icons/SelectedHome.svg', () => 'MockedSelectedHomeIcon')
jest.mock('../../../../public/assets/icons/coin.svg', () => 'MockedCoinIcon')
jest.mock('../../../../public/assets/icons/SelectedCoin.svg', () => 'MockedSelectedCoinIcon')


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('SideNavigation', () => {
  test('renders the SideNavigation component', () => {
    render(
        <SideNavigation selectedItem={'Home'} />
    )
    expect(screen.getByText('Seeder')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Cash Acceleration')).toBeInTheDocument()
    expect(screen.getByText('Watch how to')).toBeInTheDocument()

    const homeButton = screen.getByTestId('HomeSideNav')
    fireEvent.click(homeButton)
    expect(mockNavigate).toHaveBeenCalledWith("/home");

  })

  test('displays correct icon and text color on initial render', () => {
    render(
        <SideNavigation selectedItem={'Home'} />
    )
    expect(screen.getByAltText('Home icon')).toHaveAttribute('src', 'MockedSelectedHomeIcon')
    expect(screen.getByText('Home')).toHaveStyle({ color: '#E8E7F0' })
    expect(screen.getByAltText('Coin icon')).toHaveAttribute('src', 'MockedCoinIcon')
    expect(screen.getByText('Cash Acceleration')).toHaveStyle({ color: '#A5A5A6' })
  })

  test('changes selection on clicking a box', () => {
    render(
        <SideNavigation selectedItem={'Cash Acceleration'} />
    )

    fireEvent.click(screen.getByText('Cash Acceleration'))
    expect(screen.getByAltText('Home icon')).toHaveAttribute('src', 'MockedHomeIcon')
    expect(screen.getByText('Home')).toHaveStyle({ color: '#A5A5A6' })
    expect(screen.getByAltText('Coin icon')).toHaveAttribute('src', 'MockedSelectedCoinIcon')
    expect(screen.getByText('Cash Acceleration')).toHaveStyle({ color: '#E8E7F0' })
  })
})
