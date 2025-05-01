


export const fetchProductsAPI = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FAKE_API_PRODUCTS}/api/products`);
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
