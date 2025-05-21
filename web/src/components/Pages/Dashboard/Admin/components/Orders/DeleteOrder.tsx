import { deleteOrder, getOrders } from '@/api/orders/orders';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DeleteOrder({ order }: { order?: import('@/types/orders').Order }) {
  const [tracknumber, setTracknumber] = useState<string>('TFB-');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [orders, setOrders] = useState<import('@/types/orders').Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await getOrders();
      if (res && Array.isArray(res)) {
        setOrders(res);
      }
    }
    fetchOrders();
  }, []);

  const handleSubmit = async () => {
    setTracknumber('TFB-');
    setErrors([]);
    setIsValid(false);
    const res = await deleteOrder({ orderUuid: tracknumber });
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res!.message);
    }
  };
  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!tracknumber.trim()) errors.push('Track Number is required');
      return errors;
    };
    const errors = validateForm();
    setErrors(errors);
    setIsValid(errors.length === 0);
  }, [tracknumber]);

  useEffect(() => {
    if (order) {
      setTracknumber(order.orderUuid || '');
    }
  }, [order]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, width: 32, height: 32 }}>
            <img src="/trash.svg" alt="Delete" style={{ width: 24, height: 24 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete Order</Dialog.Title>
          <Dialog.Description>Are you sure you want to delete this order?</Dialog.Description>
          
          {/* <div className="mb-5">
            <h3>
              Format of Track Number <b>TFB-XXXXXX</b>
            </h3>
          </div> */}
            <div className="w-full mt-5">
            <Select.Root value={tracknumber} onValueChange={setTracknumber} required>
              <Select.Trigger placeholder="Выберите заказ для удаления" className="w-full" />
              <Select.Content>
              {orders.map((order) => (
                <Select.Item key={order.orderUuid} value={order.orderUuid}>
                {order.orderUuid} - {order.Name} {order.Surname} - {order.DateFrom}
                </Select.Item>
              ))}
              </Select.Content>
            </Select.Root>
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
                Delete
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
}

export default DeleteOrder;
