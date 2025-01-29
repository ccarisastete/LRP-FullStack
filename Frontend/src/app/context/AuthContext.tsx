import { createContext, useContext, useState, useEffect } from 'react';
import { authCheck } from './services/checkAuth'

type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string; // Opcional, ya que no siempre lo necesitamos
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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