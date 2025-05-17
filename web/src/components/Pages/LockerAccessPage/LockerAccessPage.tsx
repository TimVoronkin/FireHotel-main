import { useState } from 'react';
import PinInput from './PinInput';
import PinKeyboard from './PinKeyboard';

function LockerAccessPage() {
  const [pin, setPin] = useState('');

  return (
    <div className="flex flex-col gap-10 justify-center 2 items-center">
      <PinInput pin={pin} />
      <PinKeyboard setPin={setPin} pin={pin} />
    </div>
  );
}

export default LockerAccessPage;
