import { orderItemRequest, orderItemResponse } from '@/lib/types/order';
import axios from 'axios';
export const orderItems = async (orderItem: orderItemRequest): Promise<orderItemResponse> => {
  try {
    const token = localStorage.getItem("userAccessToken");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/order`,
      orderItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Order failed' };
  }
};



export const fetchSingleOrderDetails = async (orderId: any): Promise<any> => {
  try {
    const token = localStorage.getItem("userAccessToken");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Order fetch failed' };
  }
};