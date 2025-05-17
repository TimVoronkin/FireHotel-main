import { createCell } from '@/api/cells/cells';
import { getLockers } from '@/api/lockers/lockers'; // Импорт функции для получения locker'ов
import { Toaster } from '@/components/ui/sonner';
import { Cell } from '@/types/cells';
import { Button, Dialog, RadioGroup, TextField, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function CreateCell() {
  const [cellNumber, setCellNumber] = useState<string>('');
  const [lockerId, setLockerId] = useState<string>('');
  const [lockerOptions, setLockerOptions] = useState<{ id: number; name?: string }[]>([]);
  const [size, setSize] = useState<Cell['size']>('studio');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    const cell = {
      cellNumber: parseInt(cellNumber),
      locker_id: parseInt(lockerId),
      size: size,
      status: 'free' as Cell['status'],
    };

    setCellNumber('');
    setLockerId('');
    setSize('studio');
    setErrors([]);
    setIsValid(false);
    const res = await createCell(cell, cell.cellNumber);
    if (res?.error) {
      toast.error(res.message);
    } else {
      // window.location.reload();
      toast.success(res!.message);
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!cellNumber.trim() || isNaN(Number(cellNumber))) errors.push('Valid Room Number is required');
      if (!lockerId.trim() || isNaN(Number(lockerId))) errors.push('Valid Locker ID is required');
      return errors;
    };
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [cellNumber, lockerId]);

  useEffect(() => {
    async function fetchLockers() {
      const res = await getLockers();
      if (res && Array.isArray(res)) {
        const sorted = res.slice().sort((a, b) => a.id - b.id);
        setLockerOptions(sorted);
      }
    }
    fetchLockers();
  }, []);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color='green'>Create Room</Button>
        </Dialog.Trigger>
        <Dialog.Content className="flex flex-col gap-5">
          <Dialog.Title>Create Room</Dialog.Title>
          <Dialog.Description>Fill in the details below to create a new room.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4">
            <Select.Root
              value={lockerId}
              onValueChange={setLockerId}
              required
            >
              <Select.Trigger placeholder="Select Branch ID *" />
              <Select.Content>
                {lockerOptions.map((locker) => (
                  <Select.Item key={locker.id} value={locker.id.toString()}>
                    {locker.name ? `#${locker.id} - ${locker.name}` : locker.id}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            
            <TextField.Root
              id="createCell_cell_number"
              required
              placeholder="Room Number *"
              value={cellNumber}
              onChange={(e) => setCellNumber(e.target.value)}
            />

            <RadioGroup.Root value={size} defaultValue="studio" onValueChange={(value) => setSize(value as Cell['size'])}>
              <RadioGroup.Item value="studio">A single large room</RadioGroup.Item>
              <RadioGroup.Item value="1br">An apartment with one bedroom</RadioGroup.Item>
              <RadioGroup.Item value="2br">An apartment with two separate bedrooms</RadioGroup.Item>
              <RadioGroup.Item value="3br">An apartment with three separate bedrooms</RadioGroup.Item>
              <RadioGroup.Item value="penthouse">A luxurious penthouse suite</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          {!isValid && (
            <div className="text-red-500">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <div className="flex flex-row justify-end gap-5">
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="green" onClick={handleSubmit} disabled={!isValid}>
                Create
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
}

export default CreateCell;
