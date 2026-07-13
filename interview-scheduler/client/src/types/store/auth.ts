import { User } from '@/types/auth';

export type AuthState = {
    user: User | null;
    token: string | null;
    setAuth: (user: User | null, token: string | null) => void;
    clearAuth: () => void;
}
