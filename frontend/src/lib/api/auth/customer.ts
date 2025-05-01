import {axiosInstance} from '../../../utils/constants';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types/auth';

export const customerRegister = async (userDetails: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/api/customer/register', userDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};


export const customerLogin = async (userDetails: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/api/customer/login', userDetails);
    const token = response.headers['authorization']?.split(' ')[1]; 
    if (token) {
      localStorage.setItem('userAccessToken', token); 
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};



