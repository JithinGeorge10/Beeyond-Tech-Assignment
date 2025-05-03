export interface orderItemRequest {
    items: OrderItem[];
    total: string;        
    address: string;
    userId: string;
  }
  export interface OrderItem {
    productId: number;
    price: string;       // If you want to keep it numeric, use: number
    quantity: number;
  }

  export interface orderItemResponse {
    ok: boolean;
    status: number;
    success: boolean;
    message: string;
    data: {
        message(message: any): unknown;
        orderId: string;
    };
}


export type OrderPageProps = {
  params: {
    orderId: string;
  };
};