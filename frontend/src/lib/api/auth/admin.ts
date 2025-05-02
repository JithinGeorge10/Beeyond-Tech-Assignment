

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
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};



