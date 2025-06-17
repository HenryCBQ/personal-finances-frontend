
export interface CreateUserPassword {
    email: string;
    password: string;
    name: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export interface UserResponse {
    id: number;
    role: UserRole;
    email: string;
    name: string;
    pictureUrl: string | null;
    isActive: boolean;
}

export interface AuthResponse {
    statusOk: boolean;
    message: string;
    user: UserResponse | null;
}