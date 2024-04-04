import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '../Components/InputField';

test('displays error message for negative or zero cart value', () => {
  const mockCalculate = jest.fn();
  render(<InputField onCalculate={mockCalculate} />);

  fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '-50' } });
  fireEvent.click(screen.getByText('Calculate Delivery Fee'));

  expect(screen.getByText('Cart value must be greater than 0.')).toBeInTheDocument();
  expect(mockCalculate).not.toHaveBeenCalled();
});

test('displays error message for negative or zero delivery distance', () => {
  const mockCalculate = jest.fn();
  render(<InputField onCalculate={mockCalculate} />);

  fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '0' } });
  fireEvent.click(screen.getByText('Calculate Delivery Fee'));

  expect(screen.getByText('Delivery distance must be greater than 0.')).toBeInTheDocument();
  expect(mockCalculate).not.toHaveBeenCalled();
});

test('displays error message for negative or zero number of items', () => {
  const mockCalculate = jest.fn();
  render(<InputField onCalculate={mockCalculate} />);

  fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '-2' } });
  fireEvent.click(screen.getByText('Calculate Delivery Fee'));

  expect(screen.getByText('Number of items must be greater than 0.')).toBeInTheDocument();
  expect(mockCalculate).not.toHaveBeenCalled();
});
