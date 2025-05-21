import { deleteUser, getUsers } from '@/api/users/users';
import { Toaster } from '@/components/ui/sonner';
import { Button, Dialog, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DeleteUser({ user }: { user?: import('@/types/users').User }) {
  const [username, setUsername] = useState('');
  const [userOptions, setUserOptions] = useState<{ id: number; username: string }[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers();
      if (res && Array.isArray(res)) {
        setUserOptions(
          res
            .filter((u: any) => typeof u.id === 'number' && typeof u.username === 'string')
            .map((u: any) => ({ id: u.id, username: u.username }))
        );
      }
    }
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    setErrors([]);
    setIsValid(false);
    const userToDelete = userOptions.find(u => u.username === username);
    if (!userToDelete) {
      setErrors(['User not found']);
      return;
    }
    const res = await deleteUser({ id: Number(userToDelete.id) });
    if (res?.error) {
      toast.error(res.message);
    } else {
      window.location.reload();
      toast.success(res!.message);
    }
  };

  useEffect(() => {
    if (username) {
      setIsValid(true);
      setErrors([]);
    } else {
      setIsValid(false);
      setErrors(['Username is required']);
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
    }
  }, [user]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, width: 32, height: 32 }}>
            <img src="/trash.svg" alt="Delete" style={{ width: 24, height: 24 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete User</Dialog.Title>
          <Dialog.Description>Select a user to delete.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4">
            <Select.Root value={username} onValueChange={setUsername} required>
              <Select.Trigger placeholder="Select username" />
              <Select.Content>
                {userOptions.map((user) => (
                  <Select.Item key={user.username} value={user.username}>
                    {`#${user.id} - ${user.username}`}
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

export default DeleteUser;