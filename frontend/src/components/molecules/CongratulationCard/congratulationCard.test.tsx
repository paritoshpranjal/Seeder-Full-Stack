import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CongratulationCard } from '.';
import { congratulationCard } from '../../../utils/constant';

describe('CongratulationCard Component', () => {
    test('it should renders Congratulation Card correctly', () => {
        render(
            <CongratulationCard
                buttonName={congratulationCard.buttonName}
                headingSentence={congratulationCard.headingSentence}
                description={congratulationCard.description}
                amount={congratulationCard.amount}
            />
        );
        const congratulationIcon = screen.getByText('Congratulations you are ready to start!');
        expect(congratulationIcon).toBeInTheDocument();
        expect(screen.getByText('You are approved for funding. We are ready to advance you upto')).toBeInTheDocument();
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
});
