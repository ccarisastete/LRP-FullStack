import { createContext, useContext, useState, useEffect } from 'react';
import { authCheck } from './services/checkAuth'
import registerErrorHandler  from '../../core/api/axios';

type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string; // Opcional, ya que no siempre lo necesitamos
};

export type ErrorNotification = {
  message: string;
  type: 'error' | 'success' | 'info';
} | null;

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  error: ErrorNotification;
  login: (token: string, userData: User) => void;
  logout: () => void;
  setError :  (error: ErrorNotification) => void;
};

// Componente de notificación
const Notification = ({ message, type }: { message: string; type: 'error' | 'success' | 'info' }) => {
  if (!message) return null;

  const colors = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  return (
    <div className={`${colors[type]} fixed top-4 right-4 px-4 py-3 rounded-lg border max-w-sm transition-all duration-300`}>
      <div className="flex items-center">
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorNotification>(null);

  useEffect(() => {
    
    registerErrorHandler((message: ErrorNotification) => {
      setError(message);
    })

    const checkAuth = async () => {
      try{
        const result = await authCheck();
        if(result){
          setIsAuthenticated(true);
          setUser(result);
        }else{
          setIsAuthenticated(false);
        }
      }catch(error){
        setIsAuthenticated(false)
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    };
    checkAuth();
    registerErrorHandler(null);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token); // Guardar token en localStorage
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token'); // Eliminar token
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          
          {/* Texto */}
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, login, logout, setError }}>
      {error && <Notification message={error.message} type={error.type} />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};