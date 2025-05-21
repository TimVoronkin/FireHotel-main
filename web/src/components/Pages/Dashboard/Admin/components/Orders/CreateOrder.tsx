import { createOrder } from '@/api/orders/orders';
import { getLockers } from '@/api/lockers/lockers';
import { getCells } from '@/api/cells/cells';
import { Toaster } from '@/components/ui/sonner';
import useUserStore from '@/store/UserStore';
import { Button, Dialog, TextField, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function CreateOrder({ defaultLockerId, defaultCellId }: { defaultLockerId?: number | null; defaultCellId?: number | null }) {
  const user_id = useUserStore((state) => {
    return state.id;
  });
  const [email, setEmail] = useState<string>('');
  const [cellId, setCellId] = useState<string>(defaultCellId ? defaultCellId.toString() : '');
  const [lockerId, setLockerId] = useState<string>(defaultLockerId ? defaultLockerId.toString() : '');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Списки для дроп-меню
  const [lockerOptions, setLockerOptions] = useState<{ id: number; name?: string; location?: string }[]>([]);
  const [cellOptions, setCellOptions] = useState<{ id: number; cellNumber?: number }[]>([]);

  // Получение списка lockers
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

  // Получение списка cells (можно фильтровать по lockerId, если нужно)
  useEffect(() => {
    async function fetchCells() {
      const res = await getCells();
      if (res && Array.isArray(res)) {
        // Если lockerId выбран, фильтруем по нему
        const filtered = lockerId ? res.filter((cell) => cell.locker_id?.toString() === lockerId) : res;
        // Сортировка по cellNumber или id
        const sorted = filtered.slice().sort((a, b) => (a.cellNumber ?? a.id) - (b.cellNumber ?? b.id));
        setCellOptions(sorted);
      }
    }
    fetchCells();
  }, [lockerId]);

  const handleSubmit = async () => {
    const order = {
      email,
      cell_id: parseInt(cellId),
      locker_id: parseInt(lockerId),
      DateFrom: dateFrom || '',
      DateTo: dateTo || '',
      Name: name || '',
      Surname: surname || '',
    };
    console.log('ORDER PAYLOAD:', order); // <-- log payload
    setEmail('');
    setCellId('');
    setLockerId('');
    setDateFrom('');
    setDateTo('');
    setName('');
    setSurname('');
    setErrors([]);
    setIsValid(false);
    const res = await createOrder(order, user_id);
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res!.message);
    }
    if (!dateFrom || !dateTo) {
      toast.error('Date From and Date To are required');
      return;
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push('Valid e-mail is required');
      if (!cellId.trim() || isNaN(Number(cellId))) errors.push('Valid Cell ID is required');
      if (!lockerId.trim() || isNaN(Number(lockerId))) errors.push('Valid Locker ID is required');
      if (!dateFrom.trim()) errors.push('Date From is required');
      if (!dateTo.trim()) errors.push('Date To is required');
      if (!name.trim()) errors.push('Name is required');
      if (!surname.trim()) errors.push('Surname is required');
      return errors;
    };
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [email, cellId, lockerId, dateFrom, dateTo, name, surname]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="green">Create Order</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create Order</Dialog.Title>
          <Dialog.Description className="mb-5">Fill in the information to add an order.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="createOrder_lockerId">
                Branch <span className="text-red-500">*</span>
              </label>
              <br />
              <Select.Root value={lockerId} onValueChange={setLockerId} required>
                <Select.Trigger id="createOrder_lockerId" placeholder="Select Branch" />
                <Select.Content>
                  {lockerOptions.map((locker) => (
                    <Select.Item key={locker.id} value={locker.id.toString()}>
                      {locker.name ? `#${locker.id} - ${locker.location} \"${locker.name}\"` : locker.id}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
            <div>
              <label htmlFor="createOrder_cellId">
                Room <span className="text-red-500">*</span>
              </label>
              <br />
              <Select.Root value={cellId} onValueChange={setCellId} required>
                <Select.Trigger id="createOrder_cellId" placeholder="Select Room" />
                <Select.Content>
                  {cellOptions.map((cell) => (
                    <Select.Item key={cell.id} value={cell.id.toString()}>
                      {cell.cellNumber ? `№ ${cell.cellNumber}` : cell.id}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            <div>
              <label htmlFor="createOrder_dateFrom">
                Date From <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createOrder_dateFrom"
                required
                placeholder="Date From *"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createOrder_dateTo">
                Date To <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createOrder_dateTo"
                required
                placeholder="Date To *"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createOrder_name">
                Name <span className="text-red-500">*</span>
              </label>
              <TextField.Root id="createOrder_name" required placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="createOrder_surname">
                Surname <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createOrder_surname"
                required
                placeholder="Surname *"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="createOrder_email">
                Receiver E-mail <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createOrder_email"
                required
                placeholder="Receiver E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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

export default CreateOrder;
