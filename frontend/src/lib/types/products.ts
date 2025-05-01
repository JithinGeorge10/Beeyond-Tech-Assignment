export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    brand:String;
    description?: string;
    rating?: {
      rate: number;
      count: number;
    };
  }

 export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }