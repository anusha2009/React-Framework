import React, { useState } from 'react';
import './InputField.css';

interface InputFormProps {
  onCalculate: (inputValues: InputValues) => void;
}

export interface InputValues {
  cartValue: number | null;
  deliveryDistance: number | null;
  numberOfItems: number | null;
  orderTime: Date | null;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    cartValue: null,
    deliveryDistance: null,
    numberOfItems: null,
    orderTime: null,
  });
  const [errors, setErrors] = useState<{ [key in keyof InputValues]?: string }>({});

  const handleInputChange = (field: keyof InputValues, value: string) => {
    // Reset errors when the user makes changes
    setErrors({});

    setInputValues({
      ...inputValues,
      [field]: field === 'orderTime' ? value : parseFloat(value),
    });
  };

  const handleCalculate = () => {
    // Basic input validation
    const newErrors: { [key: string]: string } = {};

    const fieldLabels: { [key in keyof InputValues]: string } = {
      cartValue: 'Cart value',
      deliveryDistance: 'Delivery distance',
      numberOfItems: 'Number of items',
      orderTime: 'Order time',
    };

    Object.keys(inputValues).forEach((field) => {
      const fieldName = field as keyof InputValues;
      if (inputValues[fieldName] === null || inputValues[fieldName] === undefined) {
        newErrors[fieldName] = `${fieldLabels[fieldName]} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCalculate(inputValues);
  };

  return (
    <form aria-labelledby="inputFormTitle">
      <h2 id="inputFormTitle">Delivery Fee Calculator</h2>

      <div className="input-field">
        <label htmlFor="cartValue">Cart value:</label>
        <input
          type="number"
          id="cartValue"
          data-test-id="cartValue"
          onChange={(e) => handleInputChange('cartValue', e.target.value)}
          aria-describedby="cartValueError"
          min="1" // Set a minimum value to prevent negative or zero values
        />
        {errors.cartValue && <p className="error-message">{errors.cartValue}</p>}
      </div>

      <div className="input-field">
        <label htmlFor="deliveryDistance">Delivery distance:</label>
        <input
          type="number"
          id="deliveryDistance"
          data-test-id="deliveryDistance"
          onChange={(e) => handleInputChange('deliveryDistance', e.target.value)}
          aria-describedby="deliveryDistanceError"
          min="1" // Set a minimum value to prevent negative or zero values
        />
        {errors.deliveryDistance && <p className="error-message">{errors.deliveryDistance}</p>}
      </div>

      <div className="input-field">
        <label htmlFor="numberOfItems">Number of items:</label>
        <input
          type="number"
          id="numberOfItems"
          data-test-id="numberOfItems"
          onChange={(e) => handleInputChange('numberOfItems', e.target.value)}
          aria-describedby="numberOfItemsError"
          min="1" // Set a minimum value to prevent negative or zero values
        />
        {errors.numberOfItems && <p className="error-message">{errors.numberOfItems}</p>}
      </div>

      <div className="input-field">
        <label htmlFor="orderTime">Order time:</label>
        <input
          type="datetime-local"
          id="orderTime"
          data-test-id="orderTime"
          onChange={(e) => handleInputChange('orderTime', e.target.value)}
        />
        {errors.orderTime && <p className="error-message">{errors.orderTime}</p>}
      </div>

      <button type="button" onClick={handleCalculate}>
        Calculate Delivery Fee
      </button>
    </form>
  );
};

export default InputForm;
