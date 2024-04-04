import { useState } from 'react';
import InputForm, { InputValues } from './Components/InputField';
import DeliveryFeeCalculator from './Components/DeliveryFeeCalculator';

function App() {

  const [inputValues, setInputValues] = useState<InputValues>({
    cartValue: null,
    deliveryDistance: null,
    numberOfItems: null,
    orderTime: null,
  });

  const calculateDeliveryFee = (inputValues: InputValues) => {
    // Set the input values in the state
    setInputValues(inputValues);

  };

  return (
    <div className="App">
      <InputForm onCalculate={calculateDeliveryFee} />
      <DeliveryFeeCalculator inputValues={inputValues} />
    </div>
  );
}

export default App;
