import { create } from 'zustand';

interface UserAuthState {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
  logout: () => void;
}

export const useUserAuth = create<UserAuthState>((set) => ({
  role: localStorage.getItem('userRole') ?? 'BusinessOwner',
  
  setRole: (role: string) => {
    set({ role });
    localStorage.setItem('userRole', role);
  },
  
  clearRole: () => {
    set({ role: null });
    localStorage.removeItem('userRole');
  },
  
  logout: () => {
    set({ role: null });
    window.location.href = '/'; // Redirect to home or login page
  },
}));