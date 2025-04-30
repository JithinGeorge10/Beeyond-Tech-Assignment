
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { fetchProductsFromAPI } from '../services/products'; // adjust path if needed
interface ProductContextType {
  products: Product[];
  categories: string[];
  getProductsByCategory: (category: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const useProducts = () => useContext(ProductContext);

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchProductsFromAPI()
        const data = await response.json();
        console.log(data.products);
        
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid products format from API");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const value = {
    products,
    categories,
    getProductsByCategory,
    getProductById,
    loading
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
