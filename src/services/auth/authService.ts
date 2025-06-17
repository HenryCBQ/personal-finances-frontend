import type { CreateUserPassword, LoginUser, AuthResponse } from './authService.interfaces';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL;

async function fetchWithCredentials(url: string, options: RequestInit = {}): Promise<Response> {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include', 
    };
    return fetch(url, { ...defaultOptions, ...options });
}

export async function loginWithPassword(credentials: LoginUser): Promise<AuthResponse> {
    try {
        const response = await fetchWithCredentials(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            const authResponse: AuthResponse = {
                statusOk: false,
                message: Array.isArray(data.message) ? data.message[0] : data.message,
                user: null
            }
            return authResponse;
        }

        const authResponse: AuthResponse = {
            statusOk: true,
            message: "Inicio de sesión exitoso",
            user: data
        } 
        return authResponse;        
    } catch (error) {
        const authResponse: AuthResponse = {
            statusOk: false,
            message: "¡Ups! Ha ocurrido un error inesperado",
            user: null
        }
        return authResponse;
    }
}

export async function registerWithPassword(userData: CreateUserPassword): Promise<AuthResponse> {
    try {
        const response = await fetchWithCredentials(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            const authResponse: AuthResponse = {
                statusOk: false,
                message: Array.isArray(data.message) ? data.message[0] : data.message,
                user: null
            }
            return authResponse;
        }
        
        const authResponse: AuthResponse = {
            statusOk: true,
            message: data.message,
            user: null
        } 
        return authResponse;
    } catch (error) {
        const authResponse: AuthResponse = {
            statusOk: false,
            message: "¡Ups! Ha ocurrido un error inesperado",
            user: null
        }
        return authResponse;
    }
}

export function redirectToGoogleLogin() {
    window.location.href = `${API_BASE_URL}/auth/google`;
}

export async function logout() {
    try {
        const response = await fetchWithCredentials(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error logout in server');
        }
        window.location.href = '/auth/login';
    } catch (error) {
        throw error;
    }
}