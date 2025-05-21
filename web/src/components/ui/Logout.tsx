import useUserStore from '@/store/UserStore';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

function Logout() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    userStore.setId(0);
    userStore.setIsAuth(false);
    userStore.setIsAdmin(false);
    userStore.setUsername('');
    navigate('/');
  };
  return (
    <Button className="h-full" variant="outline" onClick={() => onLogoutHandler()}>
      Logout
    </Button>
  );
}

export default Logout;
