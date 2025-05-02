import { orderItemRequest, orderItemResponse } from '@/lib/types/order';
import axios from 'axios';
export const orderItems = async (orderItem: orderItemRequest): Promise<orderItemResponse> => {
    try {
      const token = localStorage.getItem("userAccessToken");
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/order`,
        orderItem, // ✅ request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ this will be accessible as req.headers.authorization
          },
          withCredentials: true,
        }
      );
  
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Order failed' };
    }
  };
  