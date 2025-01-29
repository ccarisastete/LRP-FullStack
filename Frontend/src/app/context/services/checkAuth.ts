import api from '../../../core/api/axios';

export const authCheck = async () =>{
    try{
        const token = localStorage.getItem('token');
        if (!token) return null;
        
        const response = await api.get('/user/profile',{
            headers:{
                Authorization:token
            }
        });
        return response.data
    }catch(error){
        localStorage.removeItem('token')
        console.error(error)
    }
  };