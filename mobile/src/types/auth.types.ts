import { User } from './user.types';

export interface LoginPayload {
    phone: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    phone: string;
    password: string;
    role?: string;
    vehicleNo?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
