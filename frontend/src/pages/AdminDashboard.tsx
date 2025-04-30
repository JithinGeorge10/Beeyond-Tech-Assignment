
import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  User, 
  ShoppingCart, 
  TrendingUp,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => ['pending', 'confirmed', 'preparing'].includes(order.status)).length;
  const activeDeliveries = orders.filter(order => ['ready_for_pickup', 'picked_up', 'on_the_way'].includes(order.status)).length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);
  
  // Get unique delivery partners
  const deliveryPartners = [...new Set(orders
    .filter(order => order.deliveryPartnerId)
    .map(order => order.deliveryPartnerName))]
    .map(name => {
      const partnerOrders = orders.filter(order => order.deliveryPartnerName === name);
      const completedCount = partnerOrders.filter(order => order.status === 'delivered').length;
      
      return {
        name,
        totalOrders: partnerOrders.length,
        completedOrders: completedCount,
        activeOrders: partnerOrders.filter(order => 
          ['ready_for_pickup', 'picked_up', 'on_the_way'].includes(order.status)
        ).length
      };
    });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-4xl">{totalOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span>Lifetime orders</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Orders</CardDescription>
              <CardTitle className="text-4xl">{pendingOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Awaiting preparation</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Deliveries</CardDescription>
              <CardTitle className="text-4xl">{activeDeliveries}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>In transit</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed Orders</CardDescription>
              <CardTitle className="text-4xl">{completedOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Successfully delivered</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="partners">Delivery Partners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Overview of the most recent orders in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivery Partner</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{format(new Date(order.createdAt), 'MMM d, h:mm a')}</TableCell>
                        <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          {order.deliveryPartnerName || 'Not assigned'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/orders/${order.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Partners</CardTitle>
                <CardDescription>
                  Overview of all delivery partners in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {deliveryPartners.length === 0 ? (
                  <div className="text-center py-10">
                    <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No delivery partners</h3>
                    <p className="text-muted-foreground">
                      There are no delivery partners in the system yet.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner Name</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Completed Orders</TableHead>
                        <TableHead>Active Orders</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deliveryPartners.map((partner, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{partner.name}</TableCell>
                          <TableCell>{partner.totalOrders}</TableCell>
                          <TableCell>{partner.completedOrders}</TableCell>
                          <TableCell>{partner.activeOrders}</TableCell>
                          <TableCell>
                            {partner.totalOrders > 0 
                              ? `${Math.round((partner.completedOrders / partner.totalOrders) * 100)}%` 
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
