import axios from 'axios';
import { ErrorNotification } from '../../app/context/AuthContext'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
    },
});

let errorHandler: ErrorNotification | null = null;

export const setGlobalErrorHandler = (handler:ErrorNotification)  => {
    errorHandler = handler;
};

// Interceptor de respuestas
api.interceptors.response.use(
    response => response,
    error => {
        const errorMessage = error.response?.data?.message || 'Error de conexión';
        
        if (error.response?.status === 401) {
            errorHandler?.({ message: 'Sesión expirada. Por favor inicia sesión nuevamente', type: 'error' });
        } else {
            errorHandler?.({ message: errorMessage, type: 'error' });
        }
        return Promise.reject(error);
    }
);
    
// Función para registrar el manejador de errores
export const registerErrorHandler = (handler: typeof errorHandler) => {
    errorHandler = handler;
};

export default api;