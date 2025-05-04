


export const fetchProductsAPI = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/products`);
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
