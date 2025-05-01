

import {adminAxiosInstance} from '../../../utils/constants';
import { AdminLoginRequest, AdminLoginResponse, LoginRequest, LoginResponse } from '../../types/auth';


export const adminLogin = async (adminDetails: AdminLoginRequest): Promise<AdminLoginResponse> => {
  try {
    const response = await adminAxiosInstance.post<AdminLoginResponse>('/api/admin/login', adminDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};



