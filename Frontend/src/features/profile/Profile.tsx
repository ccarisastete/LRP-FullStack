import { useAuth } from '../../app/context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
        <p>Nombre: {user?.firstName} {user?.lastName}</p>
        <p>Teléfono: {user?.phone}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};