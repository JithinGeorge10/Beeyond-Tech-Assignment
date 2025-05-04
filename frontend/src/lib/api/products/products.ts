import { ApiResponse } from "@/lib/types/products";



export const fetchProductsAPI = async () => {
  try {
     const response = await fetch(`https://fakestoreapi.in/api/products`);
     const data: ApiResponse = await response.json();

     return data;
    
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
