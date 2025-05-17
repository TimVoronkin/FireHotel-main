import { createLocker } from '@/api/lockers/lockers';
import { Toaster } from '@/components/ui/sonner';
import { Dialog } from '@radix-ui/themes';
import { Button, TextField } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

function CreateLocker() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    const lockerData = {
      name,
      location,
      description: description.trim() || '', // Description can be empty
      total_cells: 0, // Default value for total_cells, update as needed
    };

    setName('');
    setLocation('');
    setDescription('');
    setErrors([]);
    setIsValid(false);

    const res = await createLocker(lockerData);
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res.message);
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!name.trim()) errors.push('Name is required');
      if (!location.trim()) errors.push('Location is required');
      return errors;
    };

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [name, location]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="green">Create Branch</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create Branch</Dialog.Title>
          <div className="flex flex-col gap-5">
            <Dialog.Description>Fill in the form below to create a new locker.</Dialog.Description>
            <div className="flex flex-row items-center justify-between gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="createLocker_name">
                  Name <span className="text-red-500">*</span>
                </label>
                <TextField.Root
                  id="createLocker_name"
                  required
                  placeholder="Locker Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="createLocker_location">
                  Adress <span className="text-red-500">*</span>
                </label>
                <TextField.Root
                  id="createLocker_location"
                  required
                  placeholder="Branch Adress"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="createLocker_description">Description</label>
              <TextField.Root
                id="createLocker_description"
                placeholder="Branch Description (optional)"
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

export default CreateLocker;
