
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { OrderStatusTracker } from '@/components/OrderStatusTracker';
import { useOrders } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ArrowLeft, Box, Clock, MapPin, Phone, User } from 'lucide-react';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <p>The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/orders')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/orders')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Order #{orderId.split('-')[1]}</h1>
          <OrderStatusBadge status={order.status} />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Status Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderStatusTracker currentStatus={order.status} />
                
                {/* Status Timeline */}
                <div className="mt-12">
                  <h3 className="font-medium mb-4">Order Timeline</h3>
                  <div className="relative pl-8">
                    <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200"></div>
                    {order.statusHistory.map((update, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className="absolute -left-5 mt-1.5 h-3 w-3 rounded-full border-2 border-brand-purple bg-white"></div>
                        <div>
                          <p className="font-medium">
                            {update.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(update.timestamp), 'MMM d, yyyy h:mm a')}
                          </p>
                          {update.note && <p className="text-sm mt-1">{update.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            {/* Order Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                </div>
                
                {order.estimatedDeliveryTime && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(order.estimatedDeliveryTime), 'h:mm a')}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Customer Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customerName}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customerPhone}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{order.customerAddress}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Delivery Partner Info */}
            {order.deliveryPartnerId && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Partner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Partner</p>
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span>{order.deliveryPartnerName}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
