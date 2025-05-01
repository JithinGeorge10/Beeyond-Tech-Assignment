import {axiosInstance,deliveryPartneraxiosInstance} from '../../../utils/constants';
import { RegisterRequest, RegisterResponse,deliveryPartnerRequest,deliveryPartnerResponse } from '../../types/auth';

export const customerRegister = async (userDetails: RegisterRequest): Promise<RegisterResponse> => {
  try {

    const response = await axiosInstance.post<RegisterResponse>('/api/customer/register', userDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const deliveryPartnerRegister = async (deliveryPartnerDetails: deliveryPartnerRequest): Promise<deliveryPartnerResponse> => {
  try {
    const response = await deliveryPartneraxiosInstance.post<deliveryPartnerResponse>('/api/deliveryPartner/register', deliveryPartnerDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

