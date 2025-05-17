import { Button } from '@radix-ui/themes';
import React from 'react';

function InputPinButton(props: { children: React.ReactNode; setPinValueHandler: (value: string) => void }) {
  return (
    <Button
      className="p-8 border rounded-lg"
      style={{ cursor: 'pointer', padding: '3rem', fontSize: '2rem' }}
      variant="outline"
      onClick={() => props.setPinValueHandler(props!.children!.toString())}
    >
      {props.children}
    </Button>
  );
}

export default InputPinButton;
