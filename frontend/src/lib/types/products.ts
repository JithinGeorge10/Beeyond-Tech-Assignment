export interface Product {
    model: string;
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    brand:string;
    description?: string;
    rating?: {
      rate: number;
      count: number;
    };
  }

 export interface ApiResponse {
    ok: any;
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }