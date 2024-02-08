import React from 'react';
import { render, screen } from '@testing-library/react';
import loginPanel from '../../../../public/assets/images/login-panel.png';
import LoginTemplate from '.';

describe('Login Template Component', () => {
    test('it should render the image component correctly', () => {
        render(<LoginTemplate imageSrc={loginPanel} bodyNode={<></>} />);

        const icon = screen.getByTestId('login-panel');
        expect(icon).toBeDefined();
    });
});
