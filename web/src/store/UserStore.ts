import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  id: number;
  username: string;
  name: string;
  surname: string;
  isAuth: boolean;
  isAdmin: boolean;
  setId: (id: number) => void;
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setIsAuth: (isAuth: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: 0,
      username: '',
      name: '',
      surname: '',
      isAuth: false,
      isAdmin: false,
      setId: (id: number) => set({ id }),
      setUsername: (username: string) => set({ username }),
      setName: (name: string) => set({ name }),
      setSurname: (surname: string) => set({ surname }),
      setIsAuth: (isAuth: boolean) => set({ isAuth }),
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
