import axios from 'axios';
import { axiosInstance } from '../../../utils/constants';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types/auth';

export const customerRegister = async (userDetails: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/api/customer/register', userDetails);
    const token = response.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (token) {
      localStorage.setItem('userAccessToken', token);
    }
    localStorage.setItem('customerDetails', JSON.stringify(response.data.data));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};


export const customerLogin = async (userDetails: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/api/customer/login', userDetails);
    const token = response.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (token) {
      localStorage.setItem('userAccessToken', token);
    }
    localStorage.setItem('customerDetails', JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};


export const customerLogout = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("userAccessToken");

    const response = axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true  // if you're using cookies too
    });

    console.log(response);
    return response
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};


