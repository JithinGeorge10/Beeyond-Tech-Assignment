

import axios from 'axios';
import {adminAxiosInstance} from '../../../utils/constants';
import { AdminLoginRequest, AdminLoginResponse, LoginRequest, LoginResponse } from '../../types/auth';


export const adminLogin = async (adminDetails: AdminLoginRequest): Promise<AdminLoginResponse> => {
  try {
    const response = await adminAxiosInstance.post<AdminLoginResponse>('/api/admin/login', adminDetails);
    const token = response.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (token) {
      localStorage.setItem('adminAccessToken', token);
    }
    localStorage.setItem('adminDetails', JSON.stringify(response.data.data));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};


export const adminLogout = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("adminAccessToken");

    const response =await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true 
    });

    console.log(response);
    return response
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
