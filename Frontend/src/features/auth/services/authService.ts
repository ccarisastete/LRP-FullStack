import api from '../../../core/api/axios';

type RegisterData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

type LoginData={
  email:string;
  password:string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Respuesta del backend
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (userData: LoginData) => {
  try {
    const response = await api.post('/auth/login', userData);
    console.log(response)
    return response.data; // Respuesta del backend (token y datos del usuario)
  } catch (error) {
    console.error(error);
  }

};