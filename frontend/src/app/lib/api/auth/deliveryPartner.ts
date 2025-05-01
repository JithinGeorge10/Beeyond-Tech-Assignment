import {deliveryPartneraxiosInstance} from '../../../utils/constants';
import { deliveryPartnerLoginRequest, deliveryPartnerLoginResponse, deliveryPartnerRequest,deliveryPartnerResponse } from '../../types/auth';

export const deliveryPartnerRegister = async (deliveryPartnerDetails: deliveryPartnerRequest): Promise<deliveryPartnerResponse> => {
  try {
    const response = await deliveryPartneraxiosInstance.post<deliveryPartnerResponse>('/api/deliveryPartner/register', deliveryPartnerDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};


export const deliveryPartnerLogin = async (deliveryPartnerDetails: deliveryPartnerLoginRequest): Promise<deliveryPartnerLoginResponse> => {
    try {
      const response = await deliveryPartneraxiosInstance.post<deliveryPartnerLoginResponse>('/api/deliveryPartner/login', deliveryPartnerDetails);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };



