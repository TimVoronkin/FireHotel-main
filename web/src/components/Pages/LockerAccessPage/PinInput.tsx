import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/otp';

function PinInput(props: { pin: string }) {
  return (
    <div className="flex gap-2 w-full justify-center">
      <InputOTP maxLength={6} value={props.pin}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={1} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={2} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={4} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={5} className="p-[2.5rem] font-bold text-2xl" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

export default PinInput;
