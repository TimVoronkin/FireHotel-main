import InputPinButton from '@/components/ui/InputPinButton';
import { Button } from '@radix-ui/themes';

import React from 'react';

function PinKeyboard(props: { setPin: React.Dispatch<React.SetStateAction<string>>; pin: string }) {
  const setPinValueHandler = (value: string) => {
    if (props.pin.length < 6) {
      props.setPin(props.pin + value);
    } else {
      return;
    }
  };
  const clearPin = () => {
    props.setPin('');
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 w-fit">
        {Array.from({ length: 9 }, (_, index) => (
          <InputPinButton key={index} setPinValueHandler={setPinValueHandler}>
            {index + 1}
          </InputPinButton>
        ))}
        <Button variant="solid" style={{ cursor: 'pointer', padding: '3rem' }} onClick={clearPin}>
          DEL
        </Button>
        {/* ["classic", "solid", "soft", "surface", "outline", "ghost"] */}
        <InputPinButton key={0} setPinValueHandler={setPinValueHandler}>
          {0}
        </InputPinButton>
        <Button variant="solid" style={{ cursor: 'pointer', padding: '3rem' }} color="grass">
          ENTER
        </Button>
      </div>
    </div>
  );
}

export default PinKeyboard;
