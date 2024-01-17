import { create } from 'zustand';

export type Auth = {
  isAuthenticated: boolean;
  username?: string;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  isAuthenticated: false,
  username: undefined,
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    set({ isAuthenticated: false, username: undefined });
  },
}));