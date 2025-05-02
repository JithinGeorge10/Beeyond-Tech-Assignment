'use client'
import React, { useState, useEffect } from 'react';
import { ApiResponse, Product } from '../../lib/types/products';
import { fetchProductsAPI } from '../../lib/api/products/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types/user';

const HomePage: React.FC = () => {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
      const [userDetails, setUserDetails] = useState<User | null>(null);
  
  const { addToCart, totalItems } = useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchProductsAPI()
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: ApiResponse = await response.json();
        setProducts(data.products);
        const storedUserDetails = localStorage.getItem('customerDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    );
  }
  const truncateTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };




  //////handle cart function


  const handleAddToCart = (product: Product) => {
    const userAccessToken = localStorage.getItem('userAccessToken');
    if (!userAccessToken) {
      toast.error('You must be logged in to add items to the cart.');
      router.push('/Login'); 
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const currentItem = cartItems.find((item: any) => item.id === String(product.id));
    if (currentItem) {
      currentItem.quantity += 1; // Increase quantity by 1
      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Show success message
      toast.success(`${product.model} quantity increased to ${currentItem.quantity}`);
    } else {
      // If product is not in the cart, add it as a new item
      cartItems.push({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image:product.image,
        quantity: 1, // Initial quantity is 1
      });

      // Save the new cart state to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Show success message
      toast.success(`${product.model} added to cart`);
    }
    // Add product to cart and update state
    addToCart({
      id: Number(product.id),
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      unitPrice: 0,
      qty: 0
    });

  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Banner */}
      <Banner></Banner>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 mt-8">
        <div className="mb-8 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-2xl mx-auto text-black px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {userDetails && totalItems > 0 && (
            <button onClick={() => router.push('/CartPage')} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              View Cart ({totalItems})
            </button>
          )}

        </div>

        <div className="mb-8 flex justify-center items-center gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto flex-grow px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.title}
                className="h-64 w-full object-contain mb-4 rounded-lg bg-gray-100"
              />
              <h3 className="font-semibold text-black text-lg mb-2">{product.brand}</h3>
              <h3 className="font-semibold text-purple-400 text-lg mb-2">{product.model}</h3>
              <p className="text-purple-600 font-bold text-xl mb-4">${product.price}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{truncateTitle(product.title)}</span>
                <button onClick={() => handleAddToCart(product)} className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default HomePage;