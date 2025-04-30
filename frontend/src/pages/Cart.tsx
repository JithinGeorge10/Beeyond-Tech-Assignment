
import React from 'react';
import { Layout } from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, deliveryFee, total } = useCart();
  const { currentUser } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = React.useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = React.useState(currentUser?.phone || '');
  const [customerAddress, setCustomerAddress] = React.useState(currentUser?.address || '');

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }
    
    if (!customerName || !customerPhone || !customerAddress) {
      toast({
        title: "Missing information",
        description: "Please fill out all delivery details",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const order = await createOrder({
        customerName,
        customerPhone,
        customerAddress,
        items,
        subtotal,
        deliveryFee,
        total
      });
      
      clearCart();
      
      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be processed shortly",
      });
      
      navigate(`/orders/${order.id}`);
      
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was a problem placing your order",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet.</p>
            <Button onClick={() => navigate('/')}>Browse Products</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right flex items-center gap-4">
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Your delivery address"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-brand-purple hover:bg-brand-purple-dark" 
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
