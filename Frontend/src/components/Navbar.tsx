import { Link } from 'react-router-dom';
import { useAuth } from '../app/context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Mi App
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-blue-200">
                Perfil ({user?.firstName})
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Iniciar sesión
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};