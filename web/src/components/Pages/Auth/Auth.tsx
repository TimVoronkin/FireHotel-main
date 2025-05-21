import { Login } from '@/api/auth/login';
import { getUserByUsername } from '@/api/users/getUserByUsername';
import { Toaster } from '@/components/ui/sonner';
import CrossCircled from '@/icons/CrossCircled';
import useUserStore from '@/store/UserStore';
import { Button, Callout, Card, Flex, Heading, TextField } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function Auth() {
  const userStore = useUserStore();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const usernameIsValid = username.length >= 4 && username.length <= 20;
  const passwordIsValid = password.length >= 8;

  const navigate = useNavigate();

  const onLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await Login(username, password);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      userStore.setId(res.id);
      userStore.setUsername(username);
      userStore.setIsAuth(true);
      userStore.setIsAdmin(res.isAdmin);
      // fetch user info for name and surname
      const userInfo = await getUserByUsername(username);
      if (userInfo) {
        userStore.setName(userInfo.name);
        userStore.setSurname(userInfo.last_name); // last_name from backend
      }
      // Перенаправление в зависимости от роли
      if (res.isAdmin) {
        navigate('/dashboard/admin/data-viewer/statistics');
      } else {
        navigate('/dashboard/worker');
      }
    }
  };

  useEffect(() => {
    if (userStore.isAuth && userStore.isAdmin) {
      navigate('/dashboard/admin/data-viewer/statistics');
    } else if (userStore.isAuth && !userStore.isAdmin) {
      navigate('/dashboard/worker');
    }
  }, [navigate, userStore.isAdmin, userStore.isAuth]);

  return (
    <section className="flex justify-center items-center gap-5 mt-20 flex-1">
      <Card className="min-w-[400px] md:w-[900px] sm:min-w-[500px]" style={{ padding: '5rem' }}>
        <Flex justify={'center'} py={'5'}>
          <Heading className="font-bold text-red-500" as="h1" size={'8'}>
            Authorization
          </Heading>
        </Flex>

        <form className="flex flex-col justify-center items-center gap-5">
          <Flex className="flex flex-col items-center w-1/3 gap-4">
            <TextField.Root
              placeholder="Username"
              size={'3'}
              className="w-[150px] sm:w-[200px] md:w-[250px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField.Root
              placeholder="Password"
              type="password"
              min={8}
              size={'3'}
              className="w-[150px] sm:w-[200px] md:w-[250px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Flex>
            <Button size={'2'} onClick={onLoginHandler}>
              Login
            </Button>
          </Flex>
        </form>
        {usernameIsValid && passwordIsValid ? null : (
          <Flex align={'center'} justify={'center'} className="mt-5">
            <Callout.Root>
              <Callout.Icon>
                <CrossCircled />
              </Callout.Icon>
              {!usernameIsValid ? (
                <Callout.Text>Username must be between 4 and 20 characters</Callout.Text>
              ) : !passwordIsValid ? (
                <Callout.Text>Password must be at least 8 characters</Callout.Text>
              ) : null}
            </Callout.Root>
          </Flex>
        )}
      </Card>
      <Toaster />
    </section>
  );
}

export default Auth;
