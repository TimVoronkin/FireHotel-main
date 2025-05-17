import { deleteLocker } from '@/api/lockers/lockers';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DeleteLocker({ locker }: { locker?: import('@/types/lockers').Locker }) {
  const [id, setId] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    setId(0);
    setErrors([]);
    setIsValid(false);
    const res = await deleteLocker({ id: id! });
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res!.message);
    }
  };
  useEffect(() => {
    if (id) setIsValid(true);
    else {
      setIsValid(false);
      setErrors(['ID is required']);
    }
  }, [id]);
  useEffect(() => {
    if (locker) {
      setId(locker.id);
    }
  }, [locker]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, width: 32, height: 32 }}>
            <img src="/trash.svg" alt="Delete" style={{ width: 24, height: 24 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete Locker</Dialog.Title>
          <Dialog.Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, facilis.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4">
            <TextField.Root required={true} placeholder="Locker ID *" value={id} onChange={(e) => setId(Number(e.target.value))} />
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

export default DeleteLocker;
