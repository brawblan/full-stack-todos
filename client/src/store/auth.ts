import { create } from 'zustand';

export type Auth = {
  status: 'loggedOut' | 'loggedIn';
  username?: string;
  login: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  status: 'loggedOut',
  username: undefined,
  login: (username: string) => {
    set({ status: 'loggedIn', username });
  },
  logout: () => {
    set({ status: 'loggedOut', username: undefined });
  },
}));