import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalStore {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme: 'dark' | 'light') => set({ theme }),
    }),
    { name: 'global-store' },
  ),
);

export default useGlobalStore;
