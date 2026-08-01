import { useState } from "react";
import { authService } from "@/services/authService/auth";
import { LoginPayload, RegisterPayload } from "@/types";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const [loading, setLoading] = useState(false); 
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.logout);

  const loginUser = async (credentials: LoginPayload) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      await setSession(response.user, response.token);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (credentials: RegisterPayload) => {
    setLoading(true);
    try {
      await authService.register(credentials);
      const loginResponse = await authService.login({ 
          phone: credentials.phone, 
          password: credentials.password 
      });
      
      await setSession(loginResponse.user, loginResponse.token);
      return loginResponse;
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await authService.logout();
      await clearSession();
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginUser, registerUser, logoutUser };
};