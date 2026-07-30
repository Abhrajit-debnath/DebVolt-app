import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAppReady: boolean;
  setSession: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAppReady: false, 

  setSession: async (user, token) => {
    await SecureStore.setItemAsync('jwt_token', token);
    await SecureStore.setItemAsync('user_data', JSON.stringify(user));
    set({ user, token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('jwt_token');
    await SecureStore.deleteItemAsync('user_data');
    
    set({ user: null, token: null });
  },

  checkSession: async () => {
    try {
    
      const token = await SecureStore.getItemAsync('jwt_token');
      const userString = await SecureStore.getItemAsync('user_data');
      
      if (token && userString) {
        const user = JSON.parse(userString);
        set({ user, token, isAppReady: true });
      } else {
        set({ isAppReady: true });
      }
    } catch (error) {
      console.error("Failed to load session", error);
      set({ isAppReady: true });
    }
  }
}));