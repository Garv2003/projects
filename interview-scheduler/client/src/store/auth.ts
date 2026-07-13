import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/types/store/auth';

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            clearAuth: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

export { useAuthStore };