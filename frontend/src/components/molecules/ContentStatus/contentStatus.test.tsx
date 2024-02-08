import React from 'react';
import ContentStatus from '.';
import { render } from '@testing-library/react';

describe('ContentStatus component', () => {

  const defaultProps = {
    imgSrc: 'test-image.jpg',
  };

  it('should render connection status when provided', () => {
    const props = {
      ...defaultProps,
      connectionStatus: 'Connected',
    };
    const { getByText } = render(<ContentStatus {...props} />);
    expect(getByText('Connected')).toBeInTheDocument();
  });

  it('should render message when provided', () => {
    const props = {
      ...defaultProps,
      message: 'Test message',
    };
    const { getByText } = render(<ContentStatus {...props} />);
    expect(getByText('Test message')).toBeInTheDocument();
  });

  it('should render button text when provided', () => {
    const props = {
      ...defaultProps,
      buttonText: 'Click me',
    };
    const { getByText } = render(<ContentStatus {...props} />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

});
