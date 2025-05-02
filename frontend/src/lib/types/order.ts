export interface orderItemRequest {
    items: OrderItem[];
    total: string;        
    address: string;
    userId: string;
  }
  export interface OrderItem {
    productName: string;
    price: string;       // If you want to keep it numeric, use: number
    quantity: number;
  }

  export interface orderItemResponse {
    ok: boolean;
    status: number;
    success: boolean;
    message: string;
    data: {
        orderId: string;
    };
}
