import React from 'react';

interface DeliveryFeeCalculatorProps {
  inputValues: {
    cartValue: number | null;
    deliveryDistance: number | null;
    numberOfItems: number | null;
    orderTime: Date | null;
  };
}

const DeliveryFeeCalculator: React.FC<DeliveryFeeCalculatorProps> = ({ inputValues }) => {
  const calculateDeliveryFee = () => {
    const { cartValue, deliveryDistance, numberOfItems, orderTime } = inputValues;

    if (cartValue === null || deliveryDistance === null || numberOfItems === null || orderTime === null) {
      // Input values are not complete, cannot calculate the fee

      return null;
    }

    // Delivery fee is 0 if cart value is greater or equal to 200
    if (cartValue >= 200) {
      let totalFee = 0;
      return totalFee;

    }

    // Calculate small order surcharge
    const smallOrderSurcharge = Math.max(0, 10 - cartValue);

    // Calculate base delivery fee for the first 1000 meters
    let baseFee = 2;

    // Calculate additional fee for every 500 meters beyond the first 1000 meters
    const additionalDistanceFee = Math.ceil((deliveryDistance - 1000) / 500) * 1;

    // Calculate item surcharge for more than 4 items
    const itemSurcharge = numberOfItems >= 5 ? (numberOfItems - 4) * 0.5 : 0;

    // Calculate bulk fee for more than 12 items
    const bulkFee = numberOfItems > 12 ? 1.2 : 0;

    // Calculate total fee before rush hour multiplier
    let totalFee = baseFee + additionalDistanceFee + smallOrderSurcharge + itemSurcharge + bulkFee;

    // Ensure the total fee does not exceed 15€
    totalFee = Math.min(totalFee, 15);

    // Check if it's Friday rush hours (3 - 7 PM)
    const orderDate = new Date(orderTime);
    const isFridayRush = orderDate.getDay() === 5 && orderDate.getHours() >= 15 && orderDate.getHours() < 19;

    // Apply rush hour multiplier if applicable
    if (isFridayRush) {
      totalFee *= 1.2;
      // Ensure the total fee does not exceed 15€ after applying rush hour multiplier
      totalFee = Math.min(totalFee, 15);
    }

    return totalFee;
  };

  const calculatedFee = calculateDeliveryFee();

  return (
    <div>
      {calculatedFee !== null && (
        <div data-test-id="fee">
          <p>Calculated Delivery Fee: {calculatedFee.toFixed(2)}€</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryFeeCalculator;
