export interface User {
    id: string;
    name: string;
    phone: string;
    role: string;
    vehicleNo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
