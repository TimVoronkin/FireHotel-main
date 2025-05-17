import { getCells, updateCell } from '@/api/cells/cells'; // добавьте getCells
import { Toaster } from '@/components/ui/sonner';
import { Cell } from '@/types/cells';
import { Button, Dialog, RadioGroup, TextField, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function UpdateCell({ cell }: { cell?: Cell }) {
  const [cellsList, setCellsList] = useState<Cell[]>([]);
  const [id, setId] = useState<number>(cell?.id ?? 0);
  const [cellId, setCellId] = useState<number>(cell?.cellNumber ?? 0);
  const [lockerId, setLockerId] = useState<number>(cell?.locker_id ?? 0);
  const [size, setSize] = useState<Cell['size']>(cell?.size ?? 'studio');
  const [status, setStatus] = useState<Cell['status']>(cell?.status ?? 'free');
  const [reservedUntil, setReservedUntil] = useState<Date | null>(cell?.reserved_until ? new Date(cell.reserved_until) : null);
  const [orderId, setOrderId] = useState<number>(cell?.order_id ?? 0);
  const [workerId, setWorkerId] = useState<number>(cell?.worker_id ?? 0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Получаем список всех комнат для выпадающего меню
  useEffect(() => {
    async function fetchCells() {
      const res = await getCells?.();
      if (res && Array.isArray(res)) {
        setCellsList(res);
      }
    }
    fetchCells();
  }, []);

  // При выборе комнаты из дропа обновляем все поля
  const handleRoomChange = (value: string) => {
    const selected = cellsList.find(c => c.id === Number(value));
    if (selected) {
      setId(selected.id);
      setCellId(selected.cellNumber);
      setLockerId(selected.locker_id);
      setSize(selected.size);
      setStatus(selected.status);
      setReservedUntil(selected.reserved_until ? new Date(selected.reserved_until) : null);
      setOrderId(selected.order_id ?? 0);
      setWorkerId(selected.worker_id ?? 0);
    }
  };

  const handleSubmit = async () => {
    setId(0);
    setCellId(0);
    setLockerId(0);
    setSize('studio');
    setStatus('free');
    setReservedUntil(null);
    setOrderId(0);
    setWorkerId(0);
    setErrors([]);
    setIsValid(false);
    const payload: Partial<Cell> = {
      id,
      size,
      status,
    };

    if (cellId !== 0) payload.cellNumber = cellId;
    if (lockerId !== 0) payload.locker_id = lockerId;
    if (reservedUntil !== null) payload.reserved_until = reservedUntil;
    if (orderId !== 0) payload.order_id = orderId;
    if (workerId !== 0) payload.worker_id = workerId;

    const res = await updateCell(payload);
    if (res?.error) {
      toast.error(res.message);
    } else {
      // window.location.reload();
      toast.success(res!.message);
    }
  };

  useEffect(() => {
    const errors = [];
    if (!id) errors.push('ID is required');
    setErrors(errors);
    setIsValid(errors.length === 0);
  }, [id]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, minWidth: 0, width: 32, height: 32 }}>
            <img src="/edit.svg" alt="Edit" style={{ width: 20, height: 20 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Update Room</Dialog.Title>
          <Dialog.Description>Fill in the details below to update the room information.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label>Branch and Room ID *</label><br />
              
              <Select.Root
                value={id ? id.toString() : ''}
                onValueChange={handleRoomChange}
                required
              >
                <Select.Trigger placeholder="Select Room" />
                <Select.Content>
                  {cellsList.map((c) => (
                    <Select.Item key={c.id} value={c.id.toString()}>
                      {`#${c.locker_id} - ${c.id}`}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
            <div>
              <label>Room Number</label>
              <TextField.Root
                placeholder="Room Number"
                value={cellId !== 0 ? cellId : ''}
                onChange={(e) => setCellId(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Size</label>
              <RadioGroup.Root value={size} defaultValue="studio" onValueChange={(value) => setSize(value as Cell['size'])}>
                <RadioGroup.Item value="studio">Studio</RadioGroup.Item>
                <RadioGroup.Item value="1br">1 Bedroom</RadioGroup.Item>
                <RadioGroup.Item value="2br">2 Bedrooms</RadioGroup.Item>
                <RadioGroup.Item value="3br">3 Bedrooms</RadioGroup.Item>
                <RadioGroup.Item value="penthouse">Penthouse</RadioGroup.Item>
              </RadioGroup.Root>
            </div>            
            <div>
            </div>
            <div>
              <label>Status</label>
              <RadioGroup.Root value={status} defaultValue="free" onValueChange={(value) => setStatus(value as Cell['status'])}>
                <RadioGroup.Item value="free">Free</RadioGroup.Item>
                <RadioGroup.Item value="reserved">Reserved</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div>
              <label>Reserved Until</label>
              <TextField.Root
                placeholder="Reserved Until"
                value={reservedUntil ? reservedUntil.toISOString().slice(0, 10) : ''}
                type="date"
                onChange={(e) => setReservedUntil(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            {/* <div>
              <label>Order ID</label>
              <TextField.Root
                placeholder="Order ID"
                value={orderId !== 0 ? orderId : ''}
                onChange={(e) => setOrderId(Number(e.target.value))}
              />
            </div> */}
            <div>
              <label>Worker ID</label>
              <TextField.Root
                placeholder="Worker ID"
                value={workerId !== 0 ? workerId : ''}
                onChange={(e) => setWorkerId(Number(e.target.value))}
              />
            </div>
          </div>
          {!isValid && (
            <div className="text-red-500 mt-5">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <div className="flex flex-row justify-end gap-5 mt-5">
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="green" onClick={handleSubmit} disabled={!isValid}>
                Update
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
}

export default UpdateCell;
