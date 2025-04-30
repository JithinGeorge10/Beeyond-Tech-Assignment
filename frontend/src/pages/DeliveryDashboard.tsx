
import React from 'react';
import { Layout } from '@/components/Layout';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Box, Package, Check, Clock } from 'lucide-react';

const DeliveryDashboard = () => {
  const { availableOrders, userOrders, updateOrderStatus, assignOrderToDeliveryPartner } = useOrders();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter active orders (orders assigned to this delivery partner that are not delivered)
  const activeOrders = userOrders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  );
  
  // Filter completed orders (delivered or cancelled)
  const completedOrders = userOrders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  const handleAcceptOrder = async (orderId: string) => {
    if (!currentUser) return;
    
    try {
      await assignOrderToDeliveryPartner(orderId, currentUser.id, currentUser.name);
      
      toast({
        title: "Order accepted",
        description: "You have successfully accepted this order for delivery",
      });
      
    } catch (error) {
      toast({
        title: "Failed to accept order",
        description: "There was a problem accepting the order. It may have been assigned to another partner.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      toast({
        title: "Status updated",
        description: `Order status updated to ${newStatus.replace('_', ' ')}`,
      });
      
    } catch (error) {
      toast({
        title: "Failed to update status",
        description: "There was a problem updating the order status",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Delivery Dashboard</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Available Orders</CardDescription>
              <CardTitle className="text-4xl">{availableOrders.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Ready for pickup</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Deliveries</CardDescription>
              <CardTitle className="text-4xl">{activeOrders.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>In progress</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed Today</CardDescription>
              <CardTitle className="text-4xl">
                {completedOrders.filter(order => 
                  new Date(order.statusHistory[order.statusHistory.length - 1].timestamp).toDateString() === new Date().toDateString()
                ).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4" />
                <span>Delivered orders</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="available">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            {availableOrders.length === 0 ? (
              <div className="text-center py-12">
                <Box className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No available orders</h3>
                <p className="text-muted-foreground">
                  There are currently no orders available for pickup.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id.split('-')[1]}</CardTitle>
                          <CardDescription>
                            {format(new Date(order.createdAt), 'MMM d, h:mm a')}
                          </CardDescription>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Items</p>
                        <ul className="text-sm text-muted-foreground">
                          {order.items.slice(0, 2).map((item, index) => (
                            <li key={index}>{item.quantity}x {item.product.name}</li>
                          ))}
                          {order.items.length > 2 && (
                            <li>+{order.items.length - 2} more items</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Pickup From</p>
                        <p className="text-sm text-muted-foreground">
                          QuickTrack Central Kitchen
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Deliver To</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerAddress}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Earnings</p>
                          <p className="text-lg font-bold text-brand-purple">$5.00</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ~2.3 miles
                        </p>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button 
                        className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                        onClick={() => handleAcceptOrder(order.id)}
                      >
                        Accept Order
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <Box className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No active deliveries</h3>
                <p className="text-muted-foreground">
                  You don't have any active deliveries at the moment.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id.split('-')[1]}</CardTitle>
                          <CardDescription>
                            {format(new Date(order.createdAt), 'MMM d, h:mm a')}
                          </CardDescription>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerName} · {order.customerPhone}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Deliver To</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerAddress}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Items</p>
                        <ul className="text-sm text-muted-foreground">
                          {order.items.slice(0, 3).map((item, index) => (
                            <li key={index}>{item.quantity}x {item.product.name}</li>
                          ))}
                          {order.items.length > 3 && (
                            <li>+{order.items.length - 3} more items</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6 space-y-3">
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        variant="outline"
                      >
                        View Details
                      </Button>
                      
                      {/* Status Update Buttons */}
                      {order.status === 'ready_for_pickup' && (
                        <Button 
                          className="w-full bg-brand-orange hover:bg-brand-orange/80"
                          onClick={() => handleUpdateStatus(order.id, 'picked_up')}
                        >
                          Mark as Picked Up
                        </Button>
                      )}
                      
                      {order.status === 'picked_up' && (
                        <Button 
                          className="w-full bg-brand-orange hover:bg-brand-orange/80"
                          onClick={() => handleUpdateStatus(order.id, 'on_the_way')}
                        >
                          Start Delivery
                        </Button>
                      )}
                      
                      {order.status === 'on_the_way' && (
                        <Button 
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        >
                          Complete Delivery
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <div className="text-center py-12">
                <Box className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No completed deliveries</h3>
                <p className="text-muted-foreground">
                  You haven't completed any deliveries yet.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.slice(0, 9).map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id.split('-')[1]}</CardTitle>
                          <CardDescription>
                            {format(new Date(order.createdAt), 'MMM d, h:mm a')}
                          </CardDescription>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerName}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Items</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Earnings</p>
                        <p className="text-lg font-bold text-brand-purple">$5.00</p>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DeliveryDashboard;
