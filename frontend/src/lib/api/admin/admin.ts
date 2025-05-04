import axios from "axios";

export const fetchAllOrders = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("adminAccessToken");
        console.log(token);
        
      const response = await axios.get(
        `/api/v1/admin/allOrders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'all order fetch failed' };
    }
  };

  export const fetchAllDeliveryPartners = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("adminAccessToken");
  
      const response = await axios.get(
        `/api/v1/admin/delivery-partners`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'all order fetch failed' };
    }
  };
  