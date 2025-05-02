'use client'
import React, { useState, useEffect } from 'react';
import { ApiResponse, Product } from '../../lib/types/products';
import { fetchProductsAPI } from '../../lib/api/products/products';
import { FaShoppingCart } from 'react-icons/fa';  // Import the cart icon from react-icons

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null); // State to store user details

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchProductsAPI()
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: ApiResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    const storedUserDetails = localStorage.getItem('customerDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }

    fetchProducts();
  }, []);
  console.log(userDetails);

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
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-purple-50 border-b border-purple-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Quick Commerce</h1>
          <div className="flex gap-4 items-center">
            {userDetails ? (
              <div className="flex items-center gap-5">
                <FaShoppingCart className="text-purple-600" size={20} />
                <span className="text-purple-600 font-semibold">
                  Welcome, {userDetails.data.fullName}
                </span>

              </div>

            ) : (
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Banner */}
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-purple-100 rounded-xl p-8 text-center text-white">
          <h2 className="text-4xl text-black font-bold mb-4">Fast delivery at your fingertips</h2>
          <p className="text-lg text-black mb-6">Order what you need and track it in real-time with Quick Commerce.</p>
          <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-purple-50">
            Browse Products
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 mt-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-2xl mx-auto text-black px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
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
                <button className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-50 border-t border-purple-100 py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-purple-600 hover:text-purple-700">About</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">Contact</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">FAQ</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">Shipping</a>
          </div>
          <p className="text-gray-600">© 2023 Quick Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;