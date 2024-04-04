import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeliveryFeeCalculator from '../Components/DeliveryFeeCalculator';

test('handles null input values gracefully', () => {
  const mockInputValues = {
    cartValue: null,
    deliveryDistance: null,
    numberOfItems: null,
    orderTime: null,
  };

  render(React.createElement(DeliveryFeeCalculator, { inputValues: mockInputValues }));

  expect(screen.queryByText('Calculated Delivery Fee:')).not.toBeInTheDocument();
});

test('applies rush hour multiplier on Friday between 3 PM and 7 PM', () => {
  const mockInputValues = {
    cartValue: 150,
    deliveryDistance: 1200,
    numberOfItems: 3,
    orderTime: new Date('2022-01-28T16:00'), // Friday at 4 PM
  };

  render(React.createElement(DeliveryFeeCalculator, { inputValues: mockInputValues }));

  expect(screen.getByText('Calculated Delivery Fee: 7.80€')).toBeInTheDocument();
});
