import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  id: number;
  username: string;
  isAuth: boolean;
  isAdmin: boolean;
  setId: (id: number) => void;
  setUsername: (username: string) => void;
  setIsAuth: (isAuth: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: 0,
      username: '',
      isAuth: false,
      isAdmin: false,
      setId: (id: number) => set({ id }),
      setUsername: (username: string) => set({ username }),
      setIsAuth: (isAuth: boolean) => set({ isAuth }),
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
    }),
    { name: 'user-store' },
  ),
);

export default useUserStore;
