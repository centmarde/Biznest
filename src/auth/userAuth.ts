

import { create } from 'zustand';

interface UserAuthState {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
  logout: () => void;
}

export const useUserAuth = create<UserAuthState>((set) => ({
  role: typeof window !== 'undefined' ? localStorage.getItem('userRole') : null,
  setRole: (role: string) => {
    set({ role });
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  },
  clearRole: () => {
    set({ role: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
    }
  },
  logout: () => {
    set({ role: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
      window.location.href = "/";
    }
  },
}));
