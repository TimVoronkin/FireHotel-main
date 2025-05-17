import { updateLocker } from '@/api/lockers/lockers';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Accept a locker prop for row-level actions
function UpdateLocker({ locker }: { locker?: import('@/types/lockers').Locker }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    const lockerData = {
      id: Number(id),
      name: name.trim() || undefined,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
    };

    setId('');
    setName('');
    setLocation('');
    setDescription('');
    setErrors([]);
    setIsValid(false);

    // try {
      const res = await updateLocker(lockerData);
      if (res?.error) {
        toast.error(res.message);
      } else {
        window.location.reload();
        toast.success(res.message);
      }
    // } catch (error) {
    //   toast.error('An error occurred while updating the locker.');
    // }
  };

  useEffect(() => {
    if (locker) {
      setId(locker.id.toString());
      setName(locker.name || '');
      setLocation(locker.location || '');
      setDescription(locker.description || '');
    }
  }, [locker]);

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!id.trim()) errors.push('Branch ID is required');
      return errors;
    };

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
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
          <Dialog.Title>Update Branch</Dialog.Title>
          <Dialog.Description>Update the branch details below. Leave fields empty to keep current values.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label htmlFor="updateLocker_id">
                Branch ID <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="updateLocker_id"
                required
                placeholder="Branch ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div></div>
            <div>
              <label htmlFor="updateLocker_name">Name</label>
              <TextField.Root
                id="updateLocker_name"
                placeholder="(unchanged)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="updateLocker_location">Location</label>
              <TextField.Root
                id="updateLocker_location"
                placeholder="(unchanged)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="updateLocker_description">Description</label>
              <TextField.Root
                id="updateLocker_description"
                placeholder="(unchanged)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {!isValid && (
            <div className="text-red-500 my-5">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <div className="flex flex-row justify-end gap-5">
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
            <Button color="green" onClick={handleSubmit} disabled={!isValid}>
              Update
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Toaster />
    </>
  );
}

export default UpdateLocker;