import axios from 'axios';
import { deliveryPartneraxiosInstance } from '../../../utils/constants';
import { deliveryPartnerLoginRequest, deliveryPartnerLoginResponse, deliveryPartnerRequest, deliveryPartnerResponse } from '../../types/auth';

export const deliveryPartnerRegister = async (deliveryPartnerDetails: deliveryPartnerRequest): Promise<deliveryPartnerResponse> => {
  try {
    const response = await deliveryPartneraxiosInstance.post<deliveryPartnerResponse>('/api/v1/deliveryPartner/register', deliveryPartnerDetails);
    const token = response.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (token) {
      localStorage.setItem('deliveryPartnerAccessToken', token);
    }
    localStorage.setItem('deliveryPartnerDetails', JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};


export const deliveryPartnerLogin = async (deliveryPartnerDetails: deliveryPartnerLoginRequest): Promise<deliveryPartnerLoginResponse> => {
  try {
    const response = await deliveryPartneraxiosInstance.post<deliveryPartnerLoginResponse>('/api/v1/deliveryPartner/login', deliveryPartnerDetails);
    const token = response.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (token) {
      localStorage.setItem('deliveryPartnerAccessToken', token);
    }
    localStorage.setItem('deliveryPartnerDetails', JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};



export const deliveryPartnerLogout = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response =await axios.delete(`/api/v1/deliveryPartner/logout`, {
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



