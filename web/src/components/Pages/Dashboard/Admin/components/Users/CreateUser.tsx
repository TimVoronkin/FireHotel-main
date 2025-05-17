import { createUser } from '@/api/users/users';
import { Toaster } from '@/components/ui/sonner';
import { Dialog } from '@radix-ui/themes';
import { Button, TextField, RadioGroup } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

function CreateUser() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'worker'>('worker');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    // Что ввёл пользователь
    console.log('User input phone:', phone);

    // Оставляем только цифры
    let cleanPhone = phone.replace(/\D/g, '');
    console.log('Digits only:', cleanPhone);

    // Если пользователь не указал код страны, добавим 420
    if (cleanPhone.length === 9) {
      cleanPhone = '420' + cleanPhone;
      console.log('Added country code:', cleanPhone);
    }

    const user = {
      name,
      last_name: lastName,
      email,
      phone: cleanPhone,
      username,
      password: password.trim(),
      role,
    };
    console.log('User object sent to API:', user);

    setName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setUsername('');
    setPassword('');
    setRole('worker');
    setErrors([]);
    setIsValid(false);
    const res = await createUser(user);
    console.log(res);
    if (res?.error) {
      toast.error(res.message);
    } else {
      // window.location.reload();
      toast.success(res.message);
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const errors = [];
      if (!name.trim()) errors.push('Name is required');
      if (!lastName.trim()) errors.push('Last Name is required');
      if (!email.trim() || !RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
        errors.push('Email is required and must be in format name@mail.com');
      }
      if (!phone.trim() || !/\d/.test(phone)) {
        errors.push('Phone is required and must contain at least one digit');
      }
      if (!username.trim()) errors.push('Username is required');
      if (!(password.trim().length >= 8)) {
        errors.push('Password is required and must be at least 8 characters long');
      }
      return errors;
    };
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);
  }, [name, lastName, email, phone, username, password, role]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="green">Create User</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create User</Dialog.Title>
          <Dialog.Description>Fill in the form below to create a new user account.</Dialog.Description>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label htmlFor="createUser_name">
                First name <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_name"
                required={true}
                placeholder="Tymofii"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createUser_lastName">
                Last name <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_lastName"
                required
                placeholder="Voronkin"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createUser_email">
                E-mail <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_email"
                required
                type="email"
                placeholder="tim@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createUser_phone">
                Phone <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_phone"
                required
                placeholder="420123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createUser_username">
                Username <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_username"
                required
                placeholder="Tim"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="createUser_password">
                Password <span className="text-red-500">*</span>
              </label>
              <TextField.Root
                id="createUser_password"
                required
                placeholder="MyPassword123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label>Role</label>
              <RadioGroup.Root defaultValue="worker" value={role} onValueChange={(value) => setRole(value as 'admin' | 'worker')}>
                <RadioGroup.Item value="worker">Worker</RadioGroup.Item>
                <RadioGroup.Item value="admin">Admin</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
          </div>
          {!isValid && (
            <div className="text-red-500 my-5">
              {errors.map((err, index) => {
                const field = err.split(' ')[0].toLowerCase();
                const isFieldEmpty =
                  (field === 'name' && !name.trim()) ||
                  (field === 'last' && !lastName.trim()) ||
                  (field === 'e-mail' && !email.trim()) ||
                  (field === 'phone' && !phone.trim()) ||
                  (field === 'username' && !username.trim()) ||
                  (field === 'password' && !password.trim());
                return !isFieldEmpty ? <p key={index}>{err}</p> : null;
              })}
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

export default CreateUser;
