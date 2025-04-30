
import React from 'react';
import { Layout } from '@/components/Layout';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ShoppingCart } from 'lucide-react';

const Orders = () => {
  const { userOrders } = useOrders();
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  const sortedOrders = [...userOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {userRole === 'customer' ? 'Your Orders' : 
             userRole === 'delivery' ? 'Your Deliveries' : 
             'All Orders'}
          </h1>
          
          {userRole === 'customer' && (
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          )}
          
          {userRole === 'delivery' && (
            <Button onClick={() => navigate('/delivery')}>
              View Available Orders
            </Button>
          )}
        </div>
        
        {sortedOrders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">
              {userRole === 'customer' ? "You haven't placed any orders yet." : 
               userRole === 'delivery' ? "You don't have any assigned deliveries yet." :
               "There are no orders in the system yet."}
            </p>
            {userRole === 'customer' && (
              <Button onClick={() => navigate('/')}>Start Shopping</Button>
            )}
            {userRole === 'delivery' && (
              <Button onClick={() => navigate('/delivery')}>Find Orders</Button>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                      <TableCell>{format(new Date(order.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
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
        )}
      </div>
    </Layout>
  );
};

export default Orders;
