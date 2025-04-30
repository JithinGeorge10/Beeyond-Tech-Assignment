
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base mb-1">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
          </div>
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-brand-purple hover:bg-brand-purple-dark"
          onClick={() => addItem(product, 1)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
