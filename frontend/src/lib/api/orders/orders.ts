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



export const fetchCustomerOrdersDetail = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("userAccessToken");

    const response = await axios.get(
      `/api/v1/customer/orders`,
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


export const fetchUnassignedOrders = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveryPartner/orders/unassigned`,
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

export const orderAccepted = async (id: string): Promise<any> => {
  try {

    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveryPartner/orders/accept`,
      { orderId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Order acceptance failed' };
  }
};


export const fetchActiveOrders = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveryPartner/orders/activeOrders`,
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


export const orderDelivered = async (id: string): Promise<any> => {
  try {

    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveryPartner/orders/delivered`,
      { orderId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Order acceptance failed' };
  }
};




export const fetchDeliveredOrders = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("deliveryPartnerAccessToken");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveryPartner/orders/deliveredOrders`,
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
