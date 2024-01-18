import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Auth = {
  isAuthenticated: boolean;
  username?: string;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<Auth, [["zustand/persist", Auth]]>(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: undefined,
      login: () => {
        set({ isAuthenticated: true });
      },
      logout: () => {
        set({ isAuthenticated: false, username: undefined });
        sessionStorage.removeItem('fullstack_todos');
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: 'fullstack_todos_auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);