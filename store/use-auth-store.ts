import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isPro?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setInitializing: (isInitializing: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (user, accessToken) =>
    set({
      user: {
        ...user,
        isPro:
          user.isPro ?? (user.role === "PRO" || user.role === "ADMIN"),
      },
      accessToken,
      isAuthenticated: true,
      isInitializing: false,
    }),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitializing: false,
    }),
  setInitializing: (isInitializing) => set({ isInitializing }),
}));
