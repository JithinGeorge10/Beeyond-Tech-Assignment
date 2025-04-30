
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { products, categories } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { items } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark rounded-xl p-8 md:p-12 mb-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Fast delivery at your fingertips</h1>
            <p className="text-lg md:text-xl mb-6">Order what you need and track it in real-time with QuickTrack.</p>
            
            {isAuthenticated ? (
              <div className="flex gap-4">
                <Button className="bg-white text-brand-purple hover:bg-gray-100">
                  Browse Products
                </Button>
                <Link to="/orders">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple">
                    View Orders
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <Button className="bg-white text-brand-purple hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-white text-brand-purple hover:bg-white hover:text-brand-purple">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search and Cart section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {isAuthenticated && items.length > 0 && (
            <Link to="/cart">
              <Button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/80">
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                View Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
              </Button>
            </Link>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="w-full mb-4 flex h-auto flex-wrap overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
