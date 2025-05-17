import { getCells, deleteCell } from '@/api/cells/cells';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Cell } from '@/types/cells';

function DeleteCell({ cell }: { cell?: Cell }) {
  const [cellsList, setCellsList] = useState<Cell[]>([]);
  const [id, setId] = useState<number>(cell?.id ?? 0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetchCells() {
      const res = await getCells?.();
      if (res && Array.isArray(res)) {
        setCellsList(res);
      }
    }
    fetchCells();
  }, []);

  const handleSubmit = async () => {
    setId(0);
    setErrors([]);
    setIsValid(false);
    const res = await deleteCell({ id: id! });
    if (res?.error) {
      toast.error(res.message);
    } else {
      // window.location.reload();
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

  return (
    // <>
    //   <Dialog.Root>
    //   <Dialog.Trigger>
    //     <Button variant="ghost" style={{ padding: 0, width: 32, height: 32 }}>
    //     <img src="/trash.svg" alt="Delete" style={{ width: 24, height: 24 }} />
    //     </Button>
    //   </Dialog.Trigger>
    //   <Dialog.Content className="flex flex-col gap-5 justify-center items-center">
    //     <Dialog.Title>Delete Room</Dialog.Title>
    //     <Dialog.Description>
    //     Are you sure you want to delete this room? This action cannot be undone.
    //     </Dialog.Description>
    //     <div className="justify-center items-center">
    //     <Select.Root
    //       value={id ? id.toString() : ''}
    //       onValueChange={(value) => setId(Number(value))}
    //       required
    //     >
    //       <Select.Trigger placeholder="Select Room" />
    //       <Select.Content>
    //       {cellsList.map((c) => (
    //         <Select.Item key={c.id} value={c.id.toString()}>
    //         {`branch #${c.locker_id} - room #${c.id}`}
    //         </Select.Item>
    //       ))}
    //       </Select.Content>
    //     </Select.Root>
    //     </div>
    //     {!isValid && (
    //     <div className="text-red-500">
    //       {errors.map((err, index) => (
    //       <p key={index}>{err}</p>
    //       ))}
    //     </div>
    //     )}
    //     <div className="flex flex-row justify-end gap-5">
    //     <Dialog.Close>
    //       <Button>Cancel</Button>
    //     </Dialog.Close>
    //     <Dialog.Close>
    //       <Button color="green" onClick={handleSubmit} disabled={!isValid}>
    //       Yes, delete
    //       </Button>
    //     </Dialog.Close>
    //     </div>
    //   </Dialog.Content>
    //   </Dialog.Root>
    //   <Toaster />
    // </>
        <>
      <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" style={{ padding: 0, width: 32, height: 32 }}>
        <img src="/trash.svg" alt="Delete" style={{ width: 24, height: 24 }} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="flex flex-col gap-5 justify-center items-center">
        <Dialog.Title>Delete Room</Dialog.Title>
        <Dialog.Description>
        Are you sure you want to delete this room? This action cannot be undone.
        </Dialog.Description>
        <div className="justify-center items-center">
        <Select.Root
          value={id ? id.toString() : ''}
          onValueChange={(value) => setId(Number(value))}
          required
        >
          <Select.Trigger placeholder="Select Room" />
          <Select.Content>
          {cellsList.map((c) => (
            <Select.Item key={c.id} value={c.id.toString()}>
            {`branch #${c.locker_id} - room #${c.id}`}
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
          <Button>Cancel</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button color="green" onClick={handleSubmit} disabled={!isValid}>
          Yes, delete
          </Button>
        </Dialog.Close>
        </div>
      </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
}

export default DeleteCell;