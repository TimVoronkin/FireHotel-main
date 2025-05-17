import { getUsers, updateUser } from '@/api/users/users';
import { Toaster } from '@/components/ui/sonner';
import { Dialog } from '@radix-ui/themes';
import { Button, TextField, Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function UpdateUser({ user }: { user?: import('@/types/users').User }) {
  const [username, setUsername] = useState('');
  const [userOptions, setUserOptions] = useState<{ username: string }[]>([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers();
      if (res && Array.isArray(res)) {
        setUserOptions(res);
      }
    }
    fetchUsers();
  }, []);

  // If user prop is provided, prefill fields
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setName(user.name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    console.log('User input phone:', phone);
    // Оставляем только цифры
    let cleanPhone = phone.replace(/\D/g, '');
    console.log('Digits only:', cleanPhone);
    // Если пользователь не указал код страны, добавим 420
    if (cleanPhone.length === 9) {
      cleanPhone = '420' + cleanPhone;
      console.log('Added country code:', cleanPhone);
    }

    const userData = {
      username: username ? username.trim() : undefined,
      name: name ? name.trim() : undefined,
      last_name: lastName ? lastName.trim() : undefined,
      email: email ? email.trim() : undefined,
      phone: phone ? phone.trim() : undefined,
      password: password ? password.trim() : undefined,
    };
    setName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setUsername('');
    setPassword('');
    setErrors([]);
    setIsValid(false);

    const res = await updateUser(userData);
    console.log(res);
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
      if (!username.trim()) errors.push('Username is required');
      if (name && !name.trim()) errors.push('Name is invalid');
      if (lastName && !lastName.trim()) errors.push('Last name is invalid');
      if (email && !/\S+@\S+\.\S+/.test(email)) errors.push('Email is invalid');
      if (phone && !/\d/.test(phone)) errors.push('Phone is not valid');
      if (password && password.length < 6) errors.push('Password must be at least 6 characters long');
      return errors;
    };
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [name, lastName, email, phone, username, password]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" style={{ padding: 0, minWidth: 0, width: 32, height: 32 }}>
            <img src="/edit.svg" alt="Edit" style={{ width: 20, height: 20 }} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Update User</Dialog.Title>
          <div>
            <label htmlFor="updateUser_username">
              Select username to update<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <Select.Root value={username} onValueChange={setUsername} required>
                <Select.Trigger placeholder="Select username" />
                <Select.Content>
                  {userOptions.map((user: any) => (
                    <Select.Item key={user.username} value={user.username}>
                      {`#${user.id} - ${user.username}`}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label htmlFor="updateUser_name">First Name</label>
              <TextField.Root
                id="updateUser_name"
                required
                placeholder="(unchanged)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="updateUser_lastName">Last Name</label>
              <TextField.Root
                id="updateUser_lastName"
                required
                placeholder="(unchanged)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="updateUser_email">E-mail</label>
              <TextField.Root
                id="updateUser_email"
                required
                type="email"
                placeholder="(unchanged)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="updateUser_phone">Phone</label>
              <TextField.Root
                id="updateUser_phone"
                required
                placeholder="(unchanged)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="updateUser_password">Password</label>
              <TextField.Root
                id="updateUser_password"
                required
                placeholder="(unchanged)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default UpdateUser;
