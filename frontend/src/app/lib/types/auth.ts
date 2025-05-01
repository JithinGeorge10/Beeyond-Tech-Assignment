export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    deliveryAddress: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
      id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      deliveryAddress: string;
    };
  }
  