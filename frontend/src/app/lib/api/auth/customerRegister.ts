import {axiosInstance} from '../../../utils/constants';
import { RegisterRequest, RegisterResponse } from '../../types/auth';

const customerRegister = async (userDetails: RegisterRequest): Promise<RegisterResponse> => {
  try {

    const response = await axiosInstance.post<RegisterResponse>('/api/customer/register', userDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export default customerRegister;
