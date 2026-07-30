import apiClient from "@/api/apiClient";
import { apiRoutes } from "@/routes/route";
import { isAxiosError } from "axios";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types";

export const authService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post(apiRoutes.auth.login, payload);
            return response.data;
        } catch (error: unknown) {
            throw new Error(isAxiosError(error) ? error.response?.data?.error || 'Network error.' : 'An unexpected error occurred.');
        }
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post(apiRoutes.auth.register, payload);
            return response.data;
        } catch (error: unknown) {
            throw new Error(isAxiosError(error) ? error.response?.data?.error || 'Registration failed.' : 'An unexpected error occurred.');
        }
    },

    logout: async () => {
        try {
            await apiClient.post(apiRoutes.auth.logout);
        } catch (error: unknown) {
            // We usually ignore errors here because we just want to clear the local session anyway
            console.warn("Backend logout failed:", error);
        }
    }
}