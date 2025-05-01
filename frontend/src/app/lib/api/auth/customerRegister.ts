import axiosInstance from '../axiosInstance';
import { RegisterRequest, RegisterResponse } from '../../types/auth';

const customerRegister = async (userDetails: RegisterRequest): Promise<RegisterResponse> => {
  try {
    console.log('function reached');
    
    const response = await axiosInstance.post<RegisterResponse>('/api/customer/register', userDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export default customerRegister;
