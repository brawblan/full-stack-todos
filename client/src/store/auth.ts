import { create } from 'zustand';
import { POST } from '../utilities/fetch';
import { LogoutResponse } from '../types/Response';

export type Auth = {
  username?: string;
  authBtn: string;
  logout: () => Promise<LogoutResponse>;
};

export const useAuthStore = create<Auth>(
  (set) => ({
    username: undefined,
    authBtn: 'Login',
    logout: async (): Promise<LogoutResponse> => {
      const willLogout = await POST('/auth/signOut');

      if (willLogout.success) {
        set({ username: undefined });
        sessionStorage.removeItem('fullstack_todos');
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: {
            message: 'There was an error logging out',
          }
        };
      }
    },
  }),
);