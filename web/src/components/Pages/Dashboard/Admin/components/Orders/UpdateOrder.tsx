import { updateOrder } from '@/api/orders/orders';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function UpdateOrder({ order }: { order?: import('@/types/orders').Order }) {
  const [tracknumber, setTracknumber] = useState<string>('TFB-');
  const [cellId, setCellId] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [lockerId, setLockerId] = useState<number>(0);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    setTracknumber('TFB-');
    setCellId(0);
    setEmail('');
    setLockerId(0);
    setDateFrom('');
    setDateTo('');
    setName('');
    setSurname('');
    setErrors([]);
    setIsValid(false);
    const res = await updateOrder({
      orderUuid: tracknumber,
      cell_id: cellId !== 0 ? Number(cellId) : undefined,
      email: email !== '' ? email : undefined,
      locker_id: lockerId !== 0 ? Number(lockerId) : undefined,
      DateFrom: dateFrom !== '' ? dateFrom : undefined,
      DateTo: dateTo !== '' ? dateTo : undefined,
      Name: name !== '' ? name : undefined,
      Surname: surname !== '' ? surname : undefined,
    });
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res!.message);
    }
  };

  useEffect(() => {
    if (order) {
      setTracknumber(order.orderUuid || '');
      setCellId(order.cell_id || 0);
      setEmail(order.email || '');
      setLockerId(order.locker_id || 0);
      setDateFrom(order.DateFrom || '');
      setDateTo(order.DateTo || '');
      setName(order.Name || '');
      setSurname(order.Surname || '');
    }
  }, [order]);

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!tracknumber.trim()) errors.push('Track Number is required');
      if (email.length > 0 && !/\S+@\S+\.\S+/.test(email)) errors.push('Email is invalid');
      if (!dateFrom.trim()) errors.push('Date From is required');
      if (!dateTo.trim()) errors.push('Date To is required');
      if (!name.trim()) errors.push('Name is required');
      if (!surname.trim()) errors.push('Surname is required');
      return errors;
    };
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [tracknumber, email, dateFrom, dateTo, name, surname]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, minWidth: 0, width: 32, height: 32 }}>
            <img src="/edit.svg" alt="Edit" style={{ width: 20, height: 20 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Update Order</Dialog.Title>
          <Dialog.Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, facilis.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4">
            <TextField.Root
              required={true}
              placeholder="Track Number *"
              value={tracknumber}
              onChange={(e) => setTracknumber(e.target.value)}
            />
            <TextField.Root required={false} placeholder="Cell ID" value={cellId} onChange={(e) => setCellId(parseInt(e.target.value))} />
            <TextField.Root required={false} placeholder="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            <TextField.Root
              required={false}
              placeholder="Locker ID"
              value={lockerId}
              onChange={(e) => setLockerId(parseInt(e.target.value))}
            />
            <TextField.Root required placeholder="Date From *" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <TextField.Root required placeholder="Date To *" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <TextField.Root required placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField.Root required placeholder="Surname *" value={surname} onChange={(e) => setSurname(e.target.value)} />
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

export default UpdateOrder;
